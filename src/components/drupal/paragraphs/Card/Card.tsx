import { DrupalNode, DrupalParagraph } from "next-drupal"
import "./cards.css"
import NodeCard from "../../NodeCard"
import Link from "next/link"
import Image from "next/image"
import { drupal } from "@/lib/drupal"

interface CardProps {
  data: DrupalParagraph
}

function Card({ data }: CardProps) {
  /* console.log(data) */
  return (
    <div className="paragraph--type--card cards_wrapper">
      <div className="component__wrapper cards_inner_wrapper">
        {(data.field_heading || data.field_intro_text) && (
          <div className="cards_top_wrapper">
            {data.field_heading && (
              <div className="title">{data.field_heading}</div>
            )}
            {data.field_intro_text && (
              <div
                className="des richtext"
                dangerouslySetInnerHTML={{
                  __html: data.field_intro_text?.processed,
                }}
              ></div>
            )}
          </div>
        )}
        {data.field_card_type === "related_cards" && (
          <RelatedCards
            paraId={data.drupal_internal__id}
            nodeId={data.parent_id}
          />
        )}
        {data.field_card_type === "node_reference" &&
        data.field_node_reference ? (
          <ReferenceCards nodes={data.field_node_reference} />
        ) : null}
        {data.field_card_type === "manual" && data.field_card_items ? (
          <ManualCards card_items={data.field_card_items} />
        ) : null}
      </div>
    </div>
  )
}

interface ReferenceCardsProps {
  nodes: DrupalNode[]
}

function ReferenceCards({ nodes }: ReferenceCardsProps) {
  const nodeCount = nodes.length
  return (
    <div className={`cards_item_wrapper num_of_card_${nodeCount}`}>
      {nodes.map((node) => (
        <div key={node.id} className="card__item">
          <NodeCard node={node} />
        </div>
      ))}
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

interface ManualCardsProps {
  card_items: DrupalParagraph[]
}

function ManualCards({ card_items }: ManualCardsProps) {
  const itemCount = card_items.length
  /* console.log(card_items.field_image.field_media_image) */
  return (
    <div className={`cards_item_wrapper num_of_card_${itemCount}`}>
      {card_items.map((item) => (
        <div key={item.id} className="card__item">
          {item.field_image && (
            <div className="card_image">
              <Image
                src={item.field_image.field_media_image.links.card_image.href}
                width={
                  item.field_image.field_media_image.links.card_image.meta.width
                }
                height={
                  item.field_image.field_media_image.links.card_image.meta
                    .height
                }
                alt={item.field_image.field_media_image.resourceIdObjMeta.alt}
              />
            </div>
          )}
          {(item.field_eyebrow ||
            item.field_heading ||
            item.field_card_link) && (
            <div className="card_bottom_wrapper noimage">
              <div className="card_eyebrow">{item.field_eyebrow}</div>
              <div className="card_title">{item.field_heading}</div>
              <div className="cta cta_btn">
                {item.field_card_link && (
                  <Link
                    className="link-arrow-btn link-arrow-btn--default"
                    href={item.field_card_link.full_url}
                  >
                    {item.field_card_link.title}
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Card
