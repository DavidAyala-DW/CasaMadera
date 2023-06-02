import ArticleGrid from '../articleGrid'

export default function ArticleGridSection(props) {
  const { title, articles } = props

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-heading-sm mb-3 lg:text-heading-md lg:mb-5">
        {title}
      </h2>
      <ArticleGrid articles={articles} />
    </div>
  )
}
