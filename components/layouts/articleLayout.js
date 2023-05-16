import clsx from 'clsx';
import ArticleGrid from '../articleGrid';
import ArticleMeta from '../articleMeta';
import SimpleBlockContent from '../simple-block-content';
import SanityImage from '../sanity-image';
import ArticleAuthor from '../articleAuthor';
// import SocialShareButtons from '../social-share-buttons'

export function ArticleLayout(props) {
  const { article } = props;

  return (
    <>
      <article className="container max-w-[966px] mx-auto">
        <header className="pt-32 lg:pt-48">
          <div className="">
            <h1 className="text-heading-lg lg:text-heading-xl mt-3 lg:mt-8 lg:pb-10">
              {article.title}
            </h1>

            <div className="flex flex-col md:flex-row">
              <ArticleAuthor author={article.author} />
              <ArticleMeta article={article} />
            </div>

            <div className={clsx('text-lg mt-3 mb-6 lg:hidden')}>
              {/* <SocialShareButtons /> */}
            </div>
          </div>

          {article.image ? (
            <div>
              <figure className="relative w-full max-lg:aspect-video lg:h-[540px]">
                <SanityImage
                  src={article.image}
                  layout="fill"
                  objectFit="cover"
                  sizes="(min-width: "
                />
              </figure>
            </div>
          ) : null}
        </header>

        <div className={clsx('pt-10 lg:pt-16')}>
          <div className="flex flex-col lg:flex-row gap-y-16 lg:gap-x-11">
            <div className="max-lg:hidden lg:basis-[280px] lg:shrink-0">
              <div className="lg:sticky lg:top-[120px]">
                <div className={clsx('text-lg')}>
                  {/* <SocialShareButtons /> */}
                </div>
              </div>
            </div>

            <div className="prose max-w-none max-lg:prose-sm lg:prose-h2:text-heading-lg">
              <SimpleBlockContent blocks={article.content} />
            </div>
          </div>
        </div>
      </article>

      {/* <section className="container mb-10 lg:mb-20">
          <ArticleList title="Related Articles" articles={article.relatedArticles} />
        </section> */}
    </>
  );
}
