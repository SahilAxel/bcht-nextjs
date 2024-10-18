import "@/styles/search-result-page.css"
import { drupal } from "@/lib/drupal"
import { HeroInteriorPages } from "@/components/drupal/paragraphs"
import {
  DrupalNode,
  DrupalParagraph,
  DrupalTaxonomyTerm,
  JsonApiResponse,
} from "next-drupal"
import HeroHomePage from "@/components/drupal/paragraphs/HeroBanners/HeroHomePage"
import Body from "@/components/misc/Body"
import Pagination from "@/components/navigation/Pagination"
import ArticlesFilterForm from "@/components/ui/ArticlesFilterForm"
import NodeListing from "@/components/drupal/NodeListing"
import { Suspense } from "react"

interface SearchParamProps {
  searchParams: {
    type?: string
    topic?: string
    page?: number
  }
}

export default async function SearchPage({ searchParams }: SearchParamProps) {
  const node = await drupal.getResourceByPath<DrupalNode>("/articles-listing", {
    params: {
      include: "field_hero.field_image.field_media_image",
    },
  })

  const [articleTypeOptions, topicOptions] = await Promise.all([
    drupal.getResourceCollection<DrupalTaxonomyTerm[]>(
      "taxonomy_term--article_type"
    ),
    drupal.getResourceCollection<DrupalTaxonomyTerm[]>("taxonomy_term--topic"),
  ])

  const articleType = searchParams?.type ?? "All"
  const articleTopic = searchParams?.topic ?? "All"
  const currentPage = searchParams?.page || 1
  const numberOfItemsToDisplay = 10

  const viewResults = await drupal.getView<DrupalNode[]>(
    "articles_listing--block_1",
    {
      params: {
        "page[number]": currentPage - 1,
        "page[limit]": numberOfItemsToDisplay,
        "views-filter[type]": articleType,
        "views-filter[topic]": articleTopic,
        include: "field_hero.field_image.field_media_image",
      },
    }
  )

  return (
    <article>
      {node.field_hero &&
      node.field_hero.type === "paragraph--hero_interior_pages" ? (
        <HeroInteriorPages
          data={node.field_hero as DrupalParagraph}
          nodeTitle={node.title}
        />
      ) : null}
      {node.field_hero &&
      node.field_hero.type === "paragraph--homepage_hero" ? (
        <HeroHomePage
          data={node.field_hero as DrupalParagraph}
          nodeTitle={node.title}
        />
      ) : null}

      <div
        className={`content-body paragraph--type--rich-text container-small component__wrapper check_next_component ${!node.field_hero && "nobanner_wrapper"}`}
      >
        {!node.field_hero && <h1 className="nobanner_h1">{node.title}</h1>}
        {node.body && (
          <div className="paragraph--type--rich-text">
            <Body value={node.body.processed} />
          </div>
        )}
      </div>
      <div className="paragraph--type--blocks">
        <Suspense fallback={"Loading"}>
          <ArticlesFilterForm
            typeOptions={articleTypeOptions}
            topicOptions={topicOptions}
          />
          <div className="search-result-page-wrapper article-result-page-wrapper contextual-region">
            <header>
              Showing{" "}
              {viewResults.results.length > 0
                ? currentPage > 1
                  ? `${(currentPage - 1) * numberOfItemsToDisplay + 1}-${Math.min(
                      Number(viewResults.meta.count),
                      currentPage * numberOfItemsToDisplay
                    )}`
                  : `1-${Math.min(Number(viewResults.meta.count), numberOfItemsToDisplay)}`
                : "0 - 0"}{" "}
              of {viewResults.meta.count} results
            </header>
            {viewResults.results.length > 0 ? (
              viewResults.results.map((result: DrupalNode) => (
                <div key={result.id} className="views-row">
                  <NodeListing node={result} />
                </div>
              ))
            ) : (
              <NoResultsMessage />
            )}
            <footer>
              Showing{" "}
              {viewResults.results.length > 0
                ? currentPage > 1
                  ? `${(currentPage - 1) * numberOfItemsToDisplay + 1}-${Math.min(
                      Number(viewResults.meta.count),
                      currentPage * numberOfItemsToDisplay
                    )}`
                  : `1-${Math.min(Number(viewResults.meta.count), numberOfItemsToDisplay)}`
                : "0 - 0"}{" "}
              of {viewResults.meta.count} results
            </footer>
            <Pagination
              totalItems={viewResults.meta.count}
              limit={numberOfItemsToDisplay}
            />
          </div>
        </Suspense>
      </div>
    </article>
  )
}

async function NoResultsMessage() {
  const articlesPageSettings = await drupal.getResourceCollection(
    "site_setting_entity--article_listing_no_results_setti"
  )

  return articlesPageSettings.length > 0 ? (
    articlesPageSettings.map((item) => (
      <div
        key={item.id}
        className="richtext paragraph--type--rich-text no-result"
      >
        <Body value={item.field_no_results_message.processed} />
      </div>
    ))
  ) : (
    <div className="richtext paragraph--type--rich-text no-result">
      <p>We’re sorry, your filter criteria didn’t return any results.</p>
    </div>
  )
}
