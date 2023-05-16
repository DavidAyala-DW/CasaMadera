import SanityImage from './sanity-image';

export default function ArticleAuthor(props) {
  const { author } = props;

  return (
    <address className="flex items-center gap-2">
      <SanityImage src={author.image} width={38} height={38} layout="fixed" />
      <span className="text-base">{author.name}</span>
    </address>
  );
}
