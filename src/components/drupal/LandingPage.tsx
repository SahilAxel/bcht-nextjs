import type { DrupalNode, DrupalParagraph } from "next-drupal"
import HeroInteriorPages from "@/components/drupal/paragraphs/HeroBanners/HeroInteriorPages"
import PageComponents from "./PageComponents"
import Body from "@/components/misc/Body"
import HeroHomePage from "./paragraphs/HeroBanners/HeroHomePage"

interface LandingPageProps {
  node: DrupalNode
}

export function LandingPage({ node, ...props }: LandingPageProps) {
  return (
    <article {...props}>
      {node.field_hero &&
      node.field_hero.type === "paragraph--hero_interior_pages" ? (
        <HeroInteriorPages
          data={node.field_hero as DrupalParagraph}
          nodeTitle={node.title}
        />
      ) : null}
      {node.field_hero && node.field_hero.type === "paragraph--homepage_hero" ? (
        <HeroHomePage data={node.field_hero as DrupalParagraph} nodeTitle={node.title} />
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
      <PageComponents components={node.field_components} />
    </article>
  )
}
