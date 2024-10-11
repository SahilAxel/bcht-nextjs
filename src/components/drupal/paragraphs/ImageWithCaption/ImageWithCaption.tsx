import { DrupalParagraph } from "next-drupal"
import "./image-with-caption.css"
import Image from "next/image"

interface ImageWithCaptionProps {
  data: DrupalParagraph
}

function ImageWithCaption({ data }: ImageWithCaptionProps) {
  return (
    <div className="container-small check_next_component component__wrapper paragraph--type--image-with-caption">
      <div className="image-with-caption">
        {data.field_image && (
          <div className="image-with-caption__image">
            <Image
              src={
                data.field_image.field_media_image.links.image_with_caption.href
              }
              alt={data.field_image.field_media_image.resourceIdObjMeta.alt}
              width={
                data.field_image.field_media_image.links.image_with_caption.meta
                  .width
              }
              height={
                data.field_image.field_media_image.links.image_with_caption.meta
                  .height
              }
            />
          </div>
        )}
        {data.field_caption && (
          <div className="caption-text-wrapper">
            <div
              className="caption-text-innerwrapper richtext"
              dangerouslySetInnerHTML={{ __html: data.field_caption.processed }}
            ></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageWithCaption
