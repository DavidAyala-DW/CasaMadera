import groq from 'groq'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout'
import RenderSections from '@/components/render-sections'
import { pageQueryPart } from '@/lib/queries'
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

async function fulfillSectionQueries(page, internalLinks) {
  if (!page?.content) {
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

      if (section?.locations) {
        if (Array.isArray(section.locations)) {
          // Check if this array has refs
          if (section.locations[0]?._ref) {
            await Promise.all(
              section.locations.map(async (location) => {
                const queryData = await client.fetch(
                  groq`*[_type == "locations" && _id == "${location._ref}" ][0]{...}`
                )
                const {
                  title,
                  image,
                  alt_text = '',
                  slug,
                  menus = null,
                } = queryData
                location.title = title
                location.image = image
                location.alt_text = alt_text
                location.menus = menus
                location.slug = slug
                location.query = queryData
              })
            )
          }
        } else {
          const queryData = await client.fetch(
            groq`*[_type == "locations" && _id == "${section.locations._ref}" ][0]{...}`
          )
          section.locations.query = queryData
        }
      }

      if (section._type == 'privateEventsList' && section.events) {
        if (Array.isArray(section.events)) {
          await Promise.all(
            section.events.map(async (event) => {
              const queryData = await client.fetch(
                groq`*[_type == "eventsCasaMadera" && _id == "${event._ref}" ][0]{...}`
              )
              const { title, image, alt_text = '', slug, book_link } = queryData
              event.title = title
              event.image = image
              event.alt_text = alt_text
              event.book_link = book_link
              event.slug = slug
            })
          )
        }
      }

      if (section._type === 'imageWithText' && section?.show_locations) {
        section.locations = page?.locations
      }

      if (section._type === 'textContentCenter' && section?.show_locations) {
        section.locations = page?.locations
      }

      //Detectar _type-> el nombre de un documento y para cada documento se tendra un objeto desde el server con query groq, revisar que solo se ejecute una vez
      if (section.query) {
        const queryData = await client.fetch(groq`${section.query}`)

        return { ...section, query: queryData }
      } else {
        return section
      }
    })
  )

  page.content = sectionsWithQueryData

  return page
}

export async function getStaticPaths() {
  const routes = await client.fetch(groq`*[_type == 'routesCasaMadera']{slug}`)
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

async function getLocations() {
  const request = await client.fetch(
    groq`*[_type == "locations"] | order(_createdAt  asc) {_id, title, comming_soon, menus, slug {current}} `
  )
  return request
}

async function getSiteConfig() {
  const siteSettings = await client.fetch(
    groq`*[_type == "siteSettings" && site == "casaMadera"][0]{...}`
  )
  return siteSettings
}

async function getPageSections(slug) {
  const request = await client.fetch(
    groq`
      *[_type == "routesCasaMadera" && slug.current in $possibleSlugs][0] {
        ...,
        page -> {
          ${pageQueryPart}
        }
      }
    `,
    { possibleSlugs: getSlugVariations(slug) }
  )

  return request?.page
}

export const getStaticProps = async ({ params, preview = false }) => {
  const slug = slugParamToPath(params?.slug)
  const client = getClient(preview)
  const query = groq`
    *[_type == "routesCasaMadera" && slug.current in $possibleSlugs][0] {
      ...(page -> {
        ${pageQueryPart}
      })
    }
  `
  const queryParams = { possibleSlugs: getSlugVariations(slug) }
  const data = await client.fetch(query, queryParams)
  let [siteSettings, menus, locations] = await Promise.all([
    getSiteConfig(),
    getMenus(),
    getLocations(),
  ])
  let page = filterDataToSingleItem(data, preview)
  page.locations = locations
  page = await fulfillSectionQueries(page, menus)

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
