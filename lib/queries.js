export function newsDetailsQuery(slug){
  
  return `*[_type == "newsPT" && slug.current == "${slug}" ][0]{
    title,description,link,image
  }`

}