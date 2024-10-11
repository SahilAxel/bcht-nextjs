import { DrupalParagraph } from "next-drupal"
import "./testimonial.css"
import Link from "next/link"
import { stripAndClean } from "@/lib/utils"

interface TestimonialProps {
  data: DrupalParagraph
}

function Testimonial({ data }: TestimonialProps) {
  return (
    <div className="component__wrapper paragraph--type--testimonial">
      <div
        className={`testimonial__wrapper component__wrapper ${data.field_image ? "testimonial--with-image" : "testimonial--no-image"}`}
      >
        <div className="testimonial">
          {data.field_image ? (
            <div
              className="testimonial--image"
              style={{
                backgroundImage: `url(${data.field_image.field_media_image.links.testimonial.href})`,
              }}
            ></div>
          ) : null}

          <div className="testimonial--content">
            {data.field_caption && (
              <h2 className="testimonial--content__quote">
                {stripAndClean(data.field_caption.processed)}
              </h2>
            )}

            {data.field_heading && (
              <p className="testimonial--content__attribution">
                {data.field_heading}
              </p>
            )}

            {data.field_testimonial_link && (
              <Link
                className="testimonial--content__link link-arrow-btn link-arrow-btn--white"
                href={data.field_testimonial_link.full_url}
              >
                {data.field_testimonial_link.title}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
