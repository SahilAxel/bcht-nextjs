import { DrupalParagraph } from "next-drupal"
import "./herobanner.css"
import { drupal, getFileUrl } from "@/lib/drupal"
import Link from "next/link"
import Body from "@/components/misc/Body"
import { getArticlePublicationDate } from "@/lib/utils"

interface HeroInteriorPagesProps {
  data: DrupalParagraph
  nodeTitle: string
  nodeType?: string
  publicationDate?: string
  articleDescription?: string
}

async function HeroInteriorPages({
  data,
  nodeTitle,
  nodeType,
  publicationDate,
  articleDescription,
}: HeroInteriorPagesProps) {
  return (
    <div className="paragraph--type--hero-interior-pages">
      <div
        className={`hero_banner_wrapper ${data.field_image ? "imageexist" : "noimage"}`}
      >
        {data.field_image ? (
          <div
            className="hero_image"
            style={{
              backgroundImage: `url(
                ${nodeType === "article" ? data.field_image.field_media_image.links.hero_banner_article_page.href : data.field_image.field_media_image.links.hero_banner_interior_pages.href}
              )`,
            }}
          ></div>
        ) : (
          <div className="hero_no_image"></div>
        )}

        <div className="hero_banner_content">
          {nodeType === "article" && publicationDate && (
            <div className="publication_date">{ getArticlePublicationDate(publicationDate)}</div>
          )}

          <h1>{data.field_heading ? data.field_heading : nodeTitle}</h1>
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
          {nodeType === "article" && articleDescription ? (
            <div className="banner_description richtext"><Body value={articleDescription} /></div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default HeroInteriorPages
