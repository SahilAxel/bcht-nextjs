import { DrupalNode } from "next-drupal"
import Image from "next/image"
import Link from "next/link"

interface NodeCardProps {
  node: DrupalNode
}

function NodeCard({ node }: NodeCardProps) {
  return (
    <>
      {node.field_hero.field_image && (
        <div className="card_image">
          <Image
            src={
              node.field_hero.field_image.field_media_image.links.card_image
                .href
            }
            width={
              node.field_hero.field_image.field_media_image.links.card_image
                .meta.width
            }
            height={
              node.field_hero.field_image.field_media_image.links.card_image
                .meta.height
            }
            alt={
              node.field_hero.field_image.field_media_image.resourceIdObjMeta
                .alt
            }
          />
        </div>
      )}
      <div className="card_bottom_wrapper ">
        {node.eyebrow_node && <div className="card_eyebrow">{node.eyebrow_node}</div>}
        {node.title && <div className="card_title">{node.title}</div>}
        <div className="cta cta_btn">
          <Link
            className="link-arrow-btn link-arrow-btn--default"
            href={node.path.alias}
          >
            Learn more
          </Link>
        </div>
      </div>
      <Link className="box_link" href={node.path.alias}></Link>
    </>
  )
}

export default NodeCard
