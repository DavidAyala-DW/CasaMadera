import groq from "groq";

export function newsDetailsQuery(slug){
  
  return `*[_type == "newsPT" && slug.current == "${slug}" ][0]{
    title,description,link,image
  }`

}

export function locationQuery(slug){
  
  return `*[_type == "locations" && slug.current == "${slug}" ][0]{
    title,
    menus
  }`;

}

export const pageQueryPart = groq`
  ...,
  content[] {
    ...,
    _type == 'eventList' || _type == 'eventsSlider' => {
      'events': *[_type == 'eventCasaMadera' && active] {
        ...,
        'locations': locations[] -> title,
      } | order(_createdAt desc)
    },
  }
`;