import clsx from 'clsx';
import Link from 'next/link';

import ArticleMeta from './articleMeta';
import SanityImage from './sanity-image';
import ArticleAuthor from './articleAuthor';

export default function ArticleCard(props) {
  const {
    article,
    size = 'normal', // 'normal' | 'large'
  } = props;

  return (
    <Link href={article.url}>
      <a>
        <article className={clsx('flex flex-col items-start gap-3')}>
          <div className="w-full aspect-w-[1.7] aspect-h-1">
            <figure>
              <SanityImage
                src={article.image}
                layout="fill"
                objectFit="cover"
              />
            </figure>
          </div>
          <ArticleMeta article={article} />
          <h3
            className={clsx(
              size === 'normal' ? 'text-heading-sm' : 'text-heading-md'
            )}
          >
            {article.title}
          </h3>
          {size === 'large' ? <ArticleAuthor author={article.author} /> : null}
        </article>
      </a>
    </Link>
  );
}
