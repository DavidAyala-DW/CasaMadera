import groq from 'groq'
import { NextSeo } from 'next-seo'
import client from '@/lib/sanity-client'
import Layout from '@/components/layout'
import RenderSections from '@/components/render-sections'
import { getSlugVariations, slugParamToPath } from '@/lib/urls'

export default function Page({props}) {
  
  const {
    title = 'Missing title',
    content = [],
    stickyHeader,
    siteSettings,  
    menus // Crear bloque en cms para permitir links internos, externos y crear un provider donde guardar los valores del cms y luego un hook para consumirlo desde ahi con facilidad.
  } = props

  return (    
    <Layout menus={menus} siteSettings={siteSettings} stickyHeader={stickyHeader}>
      <NextSeo
        title={title}
      />
      {content && <RenderSections sections={content} />}
    </Layout>
  )
}

async function fulfillSectionQueries(page, slug) {

  if (!page.content) {
    return page
  }

  const sectionsWithQueryData = await Promise.all(

    page.content.map(async (section) => {

      if(section.locations){

        if(Array.isArray(section.locations)){
          await Promise.all(section.locations.map(async (location) => {
            const queryData = await client.fetch(groq`*[_type == "locations" && _id == "${location._ref}" ][0]{...}`)
            const {title, image} = queryData;
            location.title = title;
            location.image = image;
            location.query = queryData;
          }

          ))

        }else{
          const queryData = await client.fetch(groq`*[_type == "locations" && _id == "${section.locations._ref}" ][0]{...}`)
          const {title, image} = queryData;
          location.title = title;
          location.image = image;
          section.locations.query = queryData;
        }

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

  const routes = await client.fetch(groq`*[_type == 'locations']{slug}`);
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

async function getMenus(){
  const request = await client.fetch(groq`*[_type == "routesCasaMadera"] {_id, slug {current}} `);
  return request;
}

async function getSiteConfig(){
  const siteSettings = await client.fetch(groq`*[_type == "siteSettings" && site == "casaMadera"][0]{...}`);
  return siteSettings;
}

async function getPageSections(slug){

  const request = await client.fetch(
    groq`
      *[_type == "locations" && slug.current in $possibleSlugs][0]{
        _id,
        title,
        content
      }
    `,
    { possibleSlugs: getSlugVariations(slug) }
  )
  
  return request
}

export const getStaticProps = async ({ params }) => {

  const slug = slugParamToPath(params?.slug)
  let [data, siteSettings, menus] = await Promise.all([getPageSections(slug), getSiteConfig(), getMenus()])
  data = await fulfillSectionQueries(data, slug)

  return {
    props:{
      props: { ...data, siteSettings, menus } || {},
    }
  }
  
}
