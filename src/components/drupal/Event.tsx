import type { DrupalNode, DrupalParagraph } from "next-drupal"
import HeroInteriorPages from "@/components/drupal/paragraphs/HeroBanners/HeroInteriorPages"
import PageComponents from "./PageComponents"
import Body from "@/components/misc/Body"

interface EventProps {
  node: DrupalNode
}

export function Event({ node, ...props }: EventProps) {
  return (
    <article {...props}>
      {node.field_hero &&
      node.field_hero.type === "paragraph--hero_interior_pages" ? (
        <HeroInteriorPages
          data={node.field_hero as DrupalParagraph}
          nodeTitle={node.title}
        />
      ) : null}
      {node.field_event_details && (
        <div className="component__wrapper event_details_wrapper">
          <div className="event_details">
            <span>Event Details: </span>
            {node.field_event_details}
          </div>
        </div>
      )}
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
