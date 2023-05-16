import Image from 'next/image';

export default function ArticleMeta(props) {
  const { article } = props;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <Image src="/images/clockIcon.svg" width={14} height={14} />
        <time
          dateTime={new Date(article.publishDate).toISOString()}
          className="uppercase font-light text-[10px] leading-3 tracking-[0.22em]"
        >
          {new Date(article.publishDate).toLocaleDateString(undefined, {
            dateStyle: 'long',
          })}
        </time>
      </div>
    </div>
  );
}
