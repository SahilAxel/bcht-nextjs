import { DrupalParagraph } from "next-drupal"
import "./imagebesidetext.css"
import Image from "next/image"
import { drupal, getAbsoluteUrl, getFileUrl } from "@/lib/drupal"
import Link from "next/link"

interface ImageBesideTextProps {
  data: DrupalParagraph
  similarCompBelow?: boolean
}

async function ImageBesideText({
  data,
  similarCompBelow = false,
}: ImageBesideTextProps) {
  return (
    <div
      className={`paragraph--type--image-beside-text ${data.field_layout === "image_on_left" ? "image_on_left" : "image_on_right"} ${similarCompBelow ? "similar_component_type_below" : undefined}`}
    >
      {data.field_type === "manual" && (
        <div className="component__wrapper">
          <div className="text_image_wrapper">
            <div className="left_content_wrapper">
              {data.field_eyebrow ? (
                <div className="text_eyebrow">{data.field_eyebrow}</div>
              ) : null}
              <h2>{data.field_heading}</h2>
              {data.field_description ? (
                <div
                  className="text_content richtext"
                  dangerouslySetInnerHTML={{
                    __html: data.field_description?.processed,
                  }}
                ></div>
              ) : null}
              {data.field_cta_link ? (
                <div className="cta cta_btn">
                  <Link
                    href={data.field_cta_link.full_url}
                    className="link-arrow-btn link-arrow-btn--default"
                  >
                    {data.field_cta_link.title}
                  </Link>
                </div>
              ) : null}
            </div>
            <div className="right_content_wrapper">
              {data.field_image ? (
                <div className="image_content">
                  <Image
                    src={
                      data.field_image.field_media_image.links.image_beside_text
                        .href
                    }
                    {...data.field_image.field_media_image.resourceIdObjMeta}
                    alt={
                      data.field_image.field_media_image.resourceIdObjMeta
                        .alt || ""
                    }
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {data.field_type === "article_reference" && (
        <div className="component__wrapper">
          <div className="text_image_wrapper_node_reff">
            <div className="text_image_wrapper">
              <div className="left_content_wrapper">
                {data.field_article_reference.eyebrow_node ? (
                  <div className="text_eyebrow">
                    {data.field_article_reference.eyebrow_node}
                  </div>
                ) : null}
                <h2>{data.field_article_reference.title}</h2>
                {data.field_article_reference.field_description_text ? (
                  <div
                    className="text_content richtext"
                    dangerouslySetInnerHTML={{
                      __html:
                        data.field_article_reference.field_description_text?.processed.slice(
                          0,
                          150
                        ),
                    }}
                  ></div>
                ) : null}
                <div className="cta cta_btn">
                  <Link
                    href={data.field_article_reference.path.alias}
                    className="link-arrow-btn link-arrow-btn--default"
                  >
                    {data.field_link_text ? data.field_link_text : "Learn More"}
                  </Link>
                </div>
              </div>
              <div className="right_content_wrapper">
                {data.field_article_reference.field_hero.field_image ? (
                  <Image
                    src={
                      data.field_article_reference.field_hero.field_image
                        .field_media_image.links.image_beside_text.href
                    }
                    width={
                      data.field_article_reference.field_hero.field_image
                        .field_media_image.links.image_beside_text.meta.width
                    }
                    height={
                      data.field_article_reference.field_hero.field_image
                        .field_media_image.links.image_beside_text.meta.height
                    }
                    alt={
                      data.field_article_reference.field_hero.field_image
                        .field_media_image.resourceIdObjMeta.alt || ""
                    }
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageBesideText
