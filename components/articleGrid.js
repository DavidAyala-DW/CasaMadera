import ArticleCard from './articleCard';

export default function ArticleGrid(props) {
  const { articles } = props;

  if (!articles?.length) {
    return null;
  }

  return (
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.concat(articles).map((article) => (
        <li key={article._id}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ol>
  );
}
