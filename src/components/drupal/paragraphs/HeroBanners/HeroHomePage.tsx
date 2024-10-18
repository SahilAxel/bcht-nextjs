import { DrupalParagraph } from "next-drupal"
import { getImageProps } from "next/image"
import "./home-herobanner.css"
import Link from "next/link"

interface HeroHomePageProps {
  data: DrupalParagraph
  nodeTitle: string
}

function HeroHomePage({ data, nodeTitle }: HeroHomePageProps) {
  const bannerImageCommonProps = {
    alt: data.field_image.field_media_image.resourceIdObjMeta.alt || "",
  }
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...bannerImageCommonProps,
    width:
      data.field_image.field_media_image.links.home_banner_desktop.meta.width,
    height:
      data.field_image.field_media_image.links.home_banner_desktop.meta.height,
    src: data.field_image.field_media_image.links.home_banner_desktop.href,
  })
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...bannerImageCommonProps,
    width:
      data.field_image.field_media_image.links.home_banner_mobile.meta.width,
    height:
      data.field_image.field_media_image.links.home_banner_mobile.meta.height,
    src: data.field_image.field_media_image.links.home_banner_mobile.href,
  })

  return (
    <div className="paragraph--type--homepage-hero">
      <div className="hero_banner_wrapper">
        {data.field_image && (
          <div className="hero_image">
            <picture>
              <source media="(min-width:768px)" srcSet={desktop} />
              <source media="(min-width: 165px)" srcSet={mobile} />
              <img {...rest} alt={data.field_image.field_media_image.resourceIdObjMeta.alt || ""}/>
            </picture>
          </div>
        )}
        <div className="hero_banner_content">
          <div className="hero_banner_content_inner">
            <h1>{data.field_hero_heading ? data.field_hero_heading : nodeTitle}</h1>

            {data.field_sub_heading && (
              <div className="sub_heading">{data.field_sub_heading}</div>
            )}

            {data.field_hero_cta_buttons && (
              <div className="cta_group">
                {data.field_hero_cta_buttons[0] && (
                  <span className="cta cta_btn_1">
                    <Link
                      className="btn btn--default"
                      href={data.field_hero_cta_buttons[0].full_url}
                    >
                      {data.field_hero_cta_buttons[0].title}
                    </Link>
                  </span>
                )}

                {data.field_hero_cta_buttons[1] && (
                  <span className="cta cta_btn_2">
                    <Link
                      className="btn-transparent btn-transparent--default"
                      href={data.field_hero_cta_buttons[1].full_url}
                    >
                      {data.field_hero_cta_buttons[1].title}
                    </Link>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroHomePage
