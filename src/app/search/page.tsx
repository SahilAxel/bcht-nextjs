import "@/styles/search-result-page.css"
import { drupal } from "@/lib/drupal"
import { HeroInteriorPages } from "@/components/drupal/paragraphs"
import { DrupalNode, DrupalParagraph, JsonApiResponse } from "next-drupal"
import HeroHomePage from "@/components/drupal/paragraphs/HeroBanners/HeroHomePage"
import Body from "@/components/misc/Body"
import Search from "@/components/ui/Search"
import axios from "axios"
import NodeListing from "@/components/drupal/NodeListing"
import Pagination from "@/components/navigation/Pagination"

interface SearchParamProps {
  searchParams: {
    search?: string
    page?: number
  }
}

interface SearchResultsResponse extends JsonApiResponse {
  total: string
  items: DrupalNode[]
}

export default async function SearchPage({ searchParams }: SearchParamProps) {
  const node = await drupal.getResourceByPath<DrupalNode>("/search", {
    params: {
      include: "field_hero.field_image.field_media_image",
    },
  })

  const query = searchParams?.search ?? ""
  const currentPage = searchParams?.page || 1
  const numberOfItemsToDisplay = 10

  const searchResults: SearchResultsResponse = await axios
    .post("http://localhost:3000/api/search/search_content", {
      page: currentPage,
      params: {
        filter: { fulltext: query },
        include: "field_hero.field_image.field_media_image",
        page: {
          limit: numberOfItemsToDisplay,
          offset:
            currentPage > 1 ? (currentPage - 1) * numberOfItemsToDisplay : 0,
        },
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error.message)
    })

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
      </div>
      <div className="paragraph--type--blocks">
        <Search />
        <div className="search-result-page-wrapper"  id="searchResults">
          <header>
            Showing{" "}
            {currentPage > 1
              ? `${(currentPage - 1) * numberOfItemsToDisplay + 1}-${Math.min(
                  Number(searchResults.total),
                  currentPage * numberOfItemsToDisplay
                )}`
              : `1-${Math.min(Number(searchResults.total), numberOfItemsToDisplay)}`}{" "}
            of {searchResults.total} results
          </header>
          {searchResults.items &&
            searchResults.items.map((result) => (
              <div key={result.id} className="views-row">
                <NodeListing node={result} />
              </div>
            ))}
          <Pagination
            totalItems={searchResults.total}
            limit={numberOfItemsToDisplay}
          />
        </div>
      </div>
    </article>
  )
}
