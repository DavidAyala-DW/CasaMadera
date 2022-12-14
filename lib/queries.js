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