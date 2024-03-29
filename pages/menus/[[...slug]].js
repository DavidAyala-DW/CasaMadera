import groq from 'groq'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout'
import RenderSections from '@/components/render-sections'
import { locationQuery, pageQueryPart } from '@/lib/queries'
import { usePreviewSubscription } from '@/lib/sanity'
import client from '@/lib/sanity-client'
import { getClient } from '@/lib/sanity.server'
import { getSlugVariations, slugParamToPath } from '@/lib/urls'

const ExitPreviewButton = dynamic(() =>
  import('@/components/exit-preview-button')
)

export default function Page(props) {
  const { preview, data, siteSettings, menus, locations } = props
  const { data: previewData } = usePreviewSubscription(data.query, {
    params: data?.queryParams ?? {},
    // The hook will return this on first render
    // This is why it's important to fetch *draft* content server-side!
    initialData: data.page,
    // The passed-down preview context determines whether this function does anything
    enabled: preview,
  })
  const page = filterDataToSingleItem(previewData, preview)

  return (
    <Layout
      isPreview={preview}
      page={page}
      menus={menus}
      locations={locations}
      siteSettings={siteSettings}
    >
      {page?.content && <RenderSections sections={page.content} />}
      {preview && <ExitPreviewButton />}
    </Layout>
  )
}

function filterDataToSingleItem(data, preview) {
  if (!Array.isArray(data)) {
    return data
  }

  if (data.length === 1) {
    return data[0]
  }

  if (preview) {
    return data.find((item) => item._id.startsWith(`drafts.`)) || data[0]
  }

  return data[0]
}

async function fulfillSectionQueries(page, slug, internalLinks) {
  if (!page.content) {
    return page
  }

  const sectionsWithQueryData = await Promise.all(
    page.content.map(async (section) => {
      if (section?.links) {
        const { _type } = section?.links ?? null
        if (_type == 'links') {
          const { link } = section?.links ?? null
          const selectedLink = internalLinks.find(
            (internalLink) => internalLink?._id == link?._ref
          )
          if (selectedLink) {
            section.links.internalLink = selectedLink?.slug?.current
          }
        }
      }

      if (section._type == 'menusContent') {
        const { title, menus } = await client.fetch(
          groq`${locationQuery(slug)}`
        )
        section.title = title
        section.menus = menus
        section.slug = slug
        section.className && delete section.className
      }

      if (section.locations) {
        if (Array.isArray(section.locations)) {
          await Promise.all(
            section.locations.map(async (location) => {
              const queryData = await client.fetch(
                groq`*[_type == "locations" && _id == "${location._ref}" ][0]{...}`
              )
              const { title, image, alt_text = '' } = queryData
              location.title = title
              location.image = image
              location.alt_text = alt_text
              location.query = queryData
            })
          )
        } else {
          const queryData = await client.fetch(
            groq`*[_type == "locations" && _id == "${section.locations._ref}" ][0]{...}`
          )
          const { title, image } = queryData
          section.title = title
          section.image = image
          // section.locations.query = queryData;
        }
      }

      if (section._type === 'imageWithText' && section?.show_locations) {
        section.locations = page?.locations
      }

      if (section._type === 'textContentCenter' && section?.show_locations) {
        section.locations = page?.locations
      }

      if (section.query) {
        const queryData = await client.fetch(groq`${section.query}`)
        return { ...section, query: queryData }
      } else {
        return section
      }
    })
  )

  return { ...page, content: sectionsWithQueryData }
}

export async function getStaticPaths() {
  const routes = await client.fetch(groq`*[_type == 'locations']{slug}`)
  const paths = routes.map(({ slug }) => ({
    params: {
      slug: slug.current === '/' ? false : [slug.current],
    },
  }))

  return {
    paths: paths,
    fallback: false,
  }
}

async function getMenus() {
  const request = await client.fetch(
    groq`*[_type == "routesCasaMadera"] {_id, slug {current}} `
  )
  return request
}

async function getSiteConfig() {
  const siteSettings = await client.fetch(
    groq`*[_type == "siteSettings" && site == "casaMadera"][0]{...}`
  )
  return siteSettings
}

async function getLocations() {
  const request = await client.fetch(
    groq`*[_type == "locations"] | order(_createdAt  asc) {_id, title, comming_soon, menus, slug {current}} `
  )
  return request
}

async function getPageSections(slug) {
  const request = await client.fetch(
    groq`
      *[_type == "locations" && slug.current in $possibleSlugs][0]{
        _id,
        title,
        menuPageContent
      }
    `,
    { possibleSlugs: getSlugVariations(slug) }
  )

  try {
    request.content = [...request.menuPageContent]
  } catch (error) {
    request.content = []
  }

  return request
}

export const getStaticProps = async ({ params, preview = false }) => {
  const slug = slugParamToPath(params?.slug)
  const client = getClient(preview)
  const query = groq`
    *[_type == "locations" && slug.current in $possibleSlugs][0]{
      ${pageQueryPart}
      'seo': menuPageSeo,
    }
  `
  const queryParams = { possibleSlugs: getSlugVariations(slug) }
  let data = await client.fetch(query, queryParams)
  let [siteSettings, menus, locations] = await Promise.all([
    getSiteConfig(),
    getMenus(),
    getLocations(),
  ])
  let page = filterDataToSingleItem(data, preview)
  page.content = page.menuPageContent
  page.locations = locations
  page = await fulfillSectionQueries(data, slug, menus)

  return {
    props: {
      data: { page, query, queryParams },
      siteSettings,
      menus,
      locations,
      preview,
    },
  }
}
