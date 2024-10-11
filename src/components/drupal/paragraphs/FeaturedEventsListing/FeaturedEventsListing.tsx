import { DrupalParagraph } from "next-drupal"
import "./featuredevent-listing.css"
import { stripAndClean } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

interface FeaturedEventsListingProps {
  data: DrupalParagraph
}

function FeaturedEventsListing({ data }: FeaturedEventsListingProps) {
  return (
    <div className="featured-event-listing-wrapper paragraph--type--featured-events-listing">
      <div className="component__wrapper featuredevents_inner_wrapper">
        <div className="featuredevents_top_wrapper">
          <div className="title">Featured Events</div>
        </div>
        {data.field_featured_events && (
          <ListingItems items={data.field_featured_events} />
        )}
        {data.field_cta_link && (
          <div className="featuredevents_link">
            <Link
              className="btn btn--default"
              href={data.field_cta_link.full_url}
            >
              {data.field_cta_link.title}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

interface ListingItemsProps {
  items: DrupalParagraph[]
}

function ListingItems({ items }: ListingItemsProps) {
  const itemCount = items.length
  return (
    <div className={`featuredevents_item_wrapper num_of_card_${itemCount}`}>
      {items.map((item) => (
        <div key={item.id} className="featuredevents_item event_reference">
          {item.field_featured_event_type === "event_reference" ? (
            <EventReference item={item} />
          ) : (
            <ManualEvent item={item} />
          )}
        </div>
      ))}
    </div>
  )
}

interface ManualEventProps {
  item: DrupalParagraph
}

function ManualEvent({ item }: ManualEventProps) {
  return (
    <>
      <div className="featuredevent_content_wrapper ">
        {item.field_eyebrow && (
          <div className="card_eyebrow">{item.field_eyebrow}</div>
        )}
        <div className="card_title">{item.field_heading}</div>
        <div className="card_des">{item.field_event_description}</div>
        <div className="cta cta_btn">
          {item.field_card_link && (
            <Link
              href={item.field_card_link.full_url}
              className="link-arrow-btn link-arrow-btn--default"
            >
              {item.field_card_link.title}
            </Link>
          )}
        </div>
      </div>
      <div className="card_image">
        {item.field_image ? (
          <Image
            src={item.field_image.field_media_image.links.featured_event.href}
            alt={item.field_image.field_media_image.resourceIdObjMeta.alt}
            width={
              item.field_image.field_media_image.links.featured_event.meta.width
            }
            height={
              item.field_image.field_media_image.links.featured_event.meta
                .height
            }
          />
        ) : (
          <Image
            src={"/cards-default.png"}
            width={303}
            height={329}
            alt="default-image"
          />
        )}
      </div>
    </>
  )
}

interface EventReferenceProps {
  item: DrupalParagraph
}

function EventReference({ item }: EventReferenceProps) {
  return (
    <>
      <div className="featuredevent_content_wrapper ">
        <div className="card_eyebrow">
          {item.field_eyebrow != null
            ? item.field_eyebrow
            : item.field_event_reference.eyebrow_node}
        </div>
        <div className="card_title">{item.field_event_reference.title}</div>
        <div
          className="card_des"
          dangerouslySetInnerHTML={{
            __html: stripAndClean(
              item.field_event_reference.body.processed
            ).slice(0, 130),
          }}
        ></div>
        <div className="cta cta_btn">
          <Link
            href={item.field_event_reference.path.alias}
            className="link-arrow-btn link-arrow-btn--default"
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className="card_image">
        {item.field_event_reference.field_hero.field_image ? (
          <Image
            src={
              item.field_event_reference.field_hero.field_image
                .field_media_image.links.featured_event.href
            }
            alt={
              item.field_event_reference.field_hero.field_image
                .field_media_image.resourceIdObjMeta.alt
            }
            width={
              item.field_event_reference.field_hero.field_image
                .field_media_image.links.featured_event.meta.width
            }
            height={
              item.field_event_reference.field_hero.field_image
                .field_media_image.links.featured_event.meta.height
            }
          />
        ) : (
          <Image
            src={"/cards-default.png"}
            width={303}
            height={329}
            alt="default-image"
          />
        )}
      </div>
    </>
  )
}

export default FeaturedEventsListing
