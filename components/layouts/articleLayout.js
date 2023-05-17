import clsx from 'clsx';
import ArticleGrid from '../articleGrid';
import ArticleMeta from '../articleMeta';
import SimpleBlockContent from '../simple-block-content';
import SanityImage from '../sanity-image';
import ArticleAuthor from '../articleAuthor';
import SocialShareButtons from '../socialShareButtons';

export function ArticleLayout(props) {
  const { article } = props;

  return (
    <div className="px-4 pb-20">
      <article className="container max-w-[966px] mx-auto">
        <header className="pt-32 lg:pt-48">
          <div className="grid gap-6">
            <h1 className="text-heading-lg text-center lg:text-heading-xl">
              {article.title}
            </h1>

            <div className="flex flex-col items-center gap-y-4 md:flex-row">
              <ArticleAuthor author={article.author} />
              <ArticleMeta article={article} />
            </div>

            <div className="mb-7 lg:hidden">
              <SocialShareButtons />
            </div>
          </div>

          {article.image ? (
            <figure className="relative h-[65vw] -mx-4 lg:h-[540px]">
              <SanityImage
                src={article.image}
                layout="fill"
                objectFit="cover"
                sizes="(min-width: 1024px) 944px"
              />
            </figure>
          ) : null}
        </header>

        <div className={clsx('pt-10 lg:pt-16')}>
          <div className="flex flex-col lg:flex-row gap-y-16 lg:gap-x-11">
            <div className="max-lg:hidden lg:basis-[280px] lg:shrink-0">
              <div className="lg:sticky lg:top-[120px]">
                <div className={clsx('text-lg')}>
                  <SocialShareButtons />
                </div>
              </div>
            </div>

            <div className="prose max-w-none lg:prose-h2:text-heading-lg">
              <SimpleBlockContent blocks={article.content} />
            </div>
          </div>
        </div>
      </article>

      {article.featuredArticles?.length ? (
        <section className="container mt-10 lg:mt-20">
          <h2 className="text-heading-sm mb-4 lg:text-heading-md">
            Keep Reading
          </h2>
          <ArticleGrid articles={article.featuredArticles} />
        </section>
      ) : null}
    </div>
  );
}
