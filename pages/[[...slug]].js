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
    slug,
    stickyHeader,
    siteSettings,  
    menus // Crear bloque en cms para permitir links internos,externos y crear un provider donde guardar los valores del cms y luego un hook para consumirlo desde ahi con facilidad.
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

async function fulfillSectionQueries(page) {

  if (!page.content) {
    return page
  }

  const sectionsWithQueryData = await Promise.all(
    page.content.map(async (section) => {

      if(section.news){
        
        if(Array.isArray(section.news)){

          await Promise.all(section.news.map(async (news) => {
            const queryData = await client.fetch(groq`*[_type == "newsPT" && _id == "${news._ref}" ][0]{
              title,description,slug,image
            }`)
            news.query = queryData;
          }

          ))

        }else{
          const queryData = await client.fetch(groq`*[_type == "newsPT" && _id == "${section.news._ref}" ][0]{
            title,description,slug,image
          }`)
          section.news.query = queryData;
        }

      }

      console.log(section._type); //Detectar _type-> el nombre de un documento y para cada documento se tendra un objeto desde el server con query groq, revisar que solo se ejecute una vez
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

  const routes = await client.fetch(groq`*[_type == 'routesCasaMadera']{slug}`);
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
  const siteSettings = await client.fetch(groq`*[_type == "siteSettings"][0]{...}`);
  return siteSettings;
}

async function getPageSections(slug){

  const request = await client.fetch(
    groq`
      *[_type == "routesCasaMadera" && slug.current in $possibleSlugs][0]{
        page -> {...}
      }
    `,
    { possibleSlugs: getSlugVariations(slug) }
  )

  return request?.page;
}

export const getStaticProps = async ({ params }) => {

  const slug = slugParamToPath(params?.slug)
  let [data, siteSettings, menus] = await Promise.all([getPageSections(slug), getSiteConfig(), getMenus()])
  data = await fulfillSectionQueries(data)
  data.slug = slug;

  return {
    props:{
      props: { ...data, siteSettings, menus } || {},
    }
  }
  
}
