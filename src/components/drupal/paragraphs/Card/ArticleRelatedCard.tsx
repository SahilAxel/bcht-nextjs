import { DrupalNode, DrupalParagraph } from "next-drupal"
import "./cards.css"
import NodeCard from "../../NodeCard"
import Link from "next/link"
import Image from "next/image"
import { drupal } from "@/lib/drupal"

interface ArticleRelatedCardProps {
  data: DrupalParagraph
}

function ArticleRelatedCard({ data }: ArticleRelatedCardProps) {
  return (
    <div className="paragraph--type--card cards_wrapper">
      <div className="component__wrapper cards_inner_wrapper">
        {data.field_heading && (
          <div className="cards_top_wrapper">
            {data.field_heading && (
              <div className="title">{data.field_heading}</div>
            )}
          </div>
        )}
        <RelatedCards
          paraId={data.drupal_internal__id}
          nodeId={data.parent_id}
        />
      </div>
    </div>
  )
}

interface RelatedCardsProps {
  paraId: number
  nodeId: string
}

async function RelatedCards({ paraId, nodeId }: RelatedCardsProps) {
  const view = await drupal.getView(
    "related_content--cards_component_related_content",
    {
      params: {
        "views-argument[0]": paraId,
        "views-argument[1]": nodeId,
        include: "field_hero.field_image.field_media_image",
      },
    }
  )
  if (view.results.length > 0) {
    return (
      <div className={`cards_item_wrapper num_of_card_${view.results.length}`}>
        {view.results.map((node: DrupalNode) => (
          <div key={node.id} className="card__item">
            <NodeCard node={node} />
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default ArticleRelatedCard
