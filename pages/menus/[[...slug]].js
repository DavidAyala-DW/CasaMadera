import groq from 'groq'
import { NextSeo } from 'next-seo'
import client from '@/lib/sanity-client'
import Layout from '@/components/layout'
import RenderSections from '@/components/render-sections'
import { getSlugVariations, slugParamToPath } from '@/lib/urls'
import {locationQuery} from "@/lib/queries"

export default function Page({props}) {
  
  const {
    title = 'Missing title',
    content = [],
    stickyHeader,
    siteSettings,  
    menus,
    locations
  } = props
  return (    
    <Layout menus={menus} locations={locations} siteSettings={siteSettings} stickyHeader={stickyHeader}>
      <NextSeo
        title={title}
      />
      {content && <RenderSections sections={content} />}
    </Layout>
  )
}

async function fulfillSectionQueries(page, slug, internalLinks) {

  if (!page.content) {
    return page
  }

  const sectionsWithQueryData = await Promise.all(

    page.content.map(async (section) => {

      if(section?.links){
        const {_type} = section?.links ?? null;
        if(_type == "links"){
          const {link} = section?.links ?? null;
          const selectedLink = internalLinks.find(internalLink => internalLink?._id == link?._ref);
          if(selectedLink){
            section.links.internalLink = selectedLink?.slug?.current;
          }          
        }        
      }

      if(section._type == "menusContent"){
        const {title,menus} = await client.fetch(groq`${locationQuery(slug)}`);
        section.title = title;
        section.menus = menus;
        section.slug = slug;
        section.className && delete section.className;
      }

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
          section.title = title;
          section.image = image;
          // section.locations.query = queryData;
        }

      }

      if(section._type === 'imageWithText' && section?.show_locations){
        section.locations = page?.locations;
      }

      if(section._type === 'textContentCenter' && section?.show_locations){
        section.locations = page?.locations;
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

async function getLocations(){
  const request = await client.fetch(groq`*[_type == "locations"] | order(_createdAt  asc) {_id, title, comming_soon, menus, slug {current}} `);
  return request;
}

async function getPageSections(slug){

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
    request.content = [...request.menuPageContent];
  } catch (error) {
    request.content = [];
  }
  
  return request
}

export const getStaticProps = async ({ params }) => {

  const slug = slugParamToPath(params?.slug)
  let [data, siteSettings, menus, locations] = await Promise.all([getPageSections(slug), getSiteConfig(), getMenus(), getLocations()])
  data.slug = slug;
  data.locations = locations;
  data = await fulfillSectionQueries(data, slug, menus)

  return {
    props:{
      props: { ...data, siteSettings, menus, locations } || {},
    }
  }
  
}