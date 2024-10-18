import Image from "next/image"
import Link from "next/link"
import "./footer.css"
import { drupal } from "@/lib/drupal"
import { Fragment, useRef } from "react"
import BackToTop from "@/components/ui/BackToTop"

export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="container">
        <div className="footer_top">
          <FooterTop />
        </div>
        <div className="footer_middle">
          <FooterMiddle />
        </div>
        <div className="footer_bottom">
          <FooterBottom />
        </div>
      </div>
      <BackToTop />
    </footer>
  )
}

async function FooterTop() {
  const footerTop = await drupal.getResourceCollection(
    "site_setting_entity--footer_top",
    {
      params: {
        include: "field_logo.field_media_image",
      },
    }
  )
  return footerTop.length > 0
    ? footerTop.map((item) => (
        <Link href="/" key={item.id}>
          <Image
            src={item.field_logo.field_media_image.links.image_optimize.href}
            alt="Boston Children's Hospital Trust"
            width={1260}
            height={144}
          />
        </Link>
      ))
    : null
}

async function FooterMiddle() {
  const footerMiddle = await drupal.getResourceCollection(
    "site_setting_entity--footer_middle"
  )
  return footerMiddle.length > 0
    ? footerMiddle.map((item) => (
        <Fragment key={item.id}>
          <div className="first-column">
            {item.field_address && (
              <div className="address">{item.field_address}</div>
            )}
            {item.field_contact_link && (
              <div className="contact-link">
                <Link href={item.field_contact_link.full_url}>
                  {item.field_contact_link.title}
                </Link>
              </div>
            )}
          </div>
          <div className="second-column">
            <FooterMenu menuName="footer-one" />
          </div>
          <div className="third-column">
            <FooterMenu menuName="footer-two" />
          </div>
          <div className="fourth-column">
            {item.field_facebook ||
            item.field_instagram ||
            item.field_linkedin ||
            item.field_youtube ? (
              <div className="social-link-wrapper">
                <span>Follow us</span>
                {item.field_facebook && (
                  <span className="facebook">
                    <Link href={item.field_facebook.full_url} target="_blank">
                      {item.field_facebook.full_url}
                    </Link>
                  </span>
                )}
                {item.field_youtube && (
                  <span className="youtube">
                    <Link href={item.field_youtube.full_url} target="_blank">
                      {item.field_youtube.full_url}
                    </Link>
                  </span>
                )}
                {item.field_instagram && (
                  <span className="insta">
                    <Link href={item.field_instagram.full_url} target="_blank">
                      {item.field_instagram.full_url}
                    </Link>
                  </span>
                )}
                {item.field_linkedin && (
                  <span className="linkedin">
                    <Link href={item.field_linkedin.full_url} target="_blank">
                      {item.field_linkedin.full_url}
                    </Link>
                  </span>
                )}
              </div>
            ) : null}
            {item.field_link && (
              <div className="newsletter-btn">
                <Link href={item.field_link.full_url}>
                  {item.field_link.title}
                </Link>
              </div>
            )}
          </div>
        </Fragment>
      ))
    : null
}

async function FooterBottom() {
  const footerBottom = await drupal.getResourceCollection(
    "site_setting_entity--footer_bottom"
  )

  if (footerBottom.length === 0) return null

  return footerBottom.map((item) => {
    return item.field_copyright_text_before_year &&
      item.field_copyright_text_after_year ? (
      <Fragment key={item.id}>
        <span>
          {item.field_copyright_text_before_year} {new Date().getFullYear()}{" "}
          {item.field_copyright_text_after_year}
        </span>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        {item.field_link && (
          <span>
            <Link href={item.field_link.full_url}>{item.field_link.title}</Link>
          </span>
        )}
      </Fragment>
    ) : null
  })
}

interface FooterMenu {
  menuName: string
}

async function FooterMenu({ menuName }: FooterMenu) {
  const menu = await drupal.getMenu(menuName)
  return (
    <ul>
      {menu.items.map((item) =>
        item.enabled ? (
          <li key={item.id}>
            <Link href={item.url}>{item.title}</Link>
          </li>
        ) : null
      )}
    </ul>
  )
}
