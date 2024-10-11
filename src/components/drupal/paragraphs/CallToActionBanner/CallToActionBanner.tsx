import { DrupalParagraph } from "next-drupal"
import Link from "next/link"
import "./cta-banner.css"
import Image from "next/image"

interface CallToActionBannerProps {
  data: DrupalParagraph
}

function CallToActionBanner({ data }: CallToActionBannerProps) {
  return (
    <div className="paragraph--type--call-to-action-cta-banner">
      <div className={`cta__banner_wraper component__wrapper ${data.field_remove_bottom_space === '1' ? "remove_bottom_space" : null}`}>
        <div
          className={`cta-banner--with-image ${data.field_image ? "cta-banner--with-image" : "cta-banner--no-image"}`}
        >
          <div className="cta-banner--with-image__content">
            {data.field_cta_headline && (
              <h2 className="cta-banner--headline">
                {data.field_cta_headline}
              </h2>
            )}
            {data.field_cta_description && (
              <p className="cta-banner--description p24">
                {data.field_cta_description}
              </p>
            )}
            {data.field_cta_link && (
              <Link
                href={data.field_cta_link.full_url}
                className="cta-banner--cta-link btn btn--white"
              >
                {data.field_cta_link.title}
              </Link>
            )}
          </div>
          {data.field_image && (
            <div className="cta-banner--with-image__image">
              <Image
                src={
                  data.field_image.field_media_image.links.image_cta_banner_3_2
                    .href
                }
                width={
                  data.field_image.field_media_image.links.image_cta_banner_3_2
                    .meta.width
                }
                height={
                  data.field_image.field_media_image.links.image_cta_banner_3_2
                    .meta.height
                }
                alt={data.field_image.field_media_image.resourceIdObjMeta.alt}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CallToActionBanner
