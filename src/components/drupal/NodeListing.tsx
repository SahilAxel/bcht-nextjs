import { DrupalNode } from "next-drupal"
import Image from "next/image"
import Link from "next/link"

interface NodeListingProps {
  node: DrupalNode
}

function NodeListing({ node }: NodeListingProps) {
  return (
    <div
      className={`search-result-item ${node.field_hero.field_image ? "hasimage" : "noimage"}`}
    >
      {node.field_hero.field_image && (
        <div className="card_image">
          <Image
            src={
              node.field_hero.field_image.field_media_image.links.link_list
                .href
            }
            width={
              node.field_hero.field_image.field_media_image.links.link_list
                .meta.width
            }
            height={
              node.field_hero.field_image.field_media_image.links.link_list
                .meta.height
            }
            alt={
              node.field_hero.field_image.field_media_image.resourceIdObjMeta
                .alt
            }
          />
        </div>
      )}
      <div className="card_content_wrapper ">
        {node.eyebrow_node && (
          <div className="card_eyebrow">{node.eyebrow_node}</div>
        )}
        {node.title && (
          <div className="card_title">
            <Link href={node.path.alias}>{node.title}</Link>
          </div>
        )}
        <Link className="box_link" href={node.path.alias}></Link>
      </div>
    </div>
  )
}

export default NodeListing
