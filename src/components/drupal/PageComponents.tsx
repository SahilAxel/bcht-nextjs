import { DrupalParagraph } from "next-drupal"
import {
  Accordion,
  CallToActionBanner,
  Card,
  FeaturedEventsListing,
  ImageBesideText,
  ImageWithCaption,
  ImpactStats,
  RichText,
  Testimonial,
  VideoEmbed,
} from "@/components/drupal/paragraphs"

interface PagecomponentsProps {
  components: DrupalParagraph[]
}

function PageComponents({ components }: PagecomponentsProps) {
  return components.map((component, index) => {
    switch (component.type) {
      case "paragraph--rich_text":
        return <RichText data={component as DrupalParagraph} />
      case "paragraph--accordion":
        return <Accordion data={component as DrupalParagraph} />
      case "paragraph--call_to_action_cta_banner":
        return <CallToActionBanner data={component as DrupalParagraph} />
      case "paragraph--image_with_caption":
        return <ImageWithCaption data={component as DrupalParagraph} />
      case "paragraph--card":
        return <Card data={component as DrupalParagraph} />
      case "paragraph--video_embed":
        return <VideoEmbed data={component as DrupalParagraph} />
      case "paragraph--testimonial":
        return <Testimonial data={component as DrupalParagraph}/>
      case "paragraph--impact_stats":
        return <ImpactStats data={component as DrupalParagraph}/>
      case "paragraph--featured_events_listing":
        return <FeaturedEventsListing data={component as DrupalParagraph}/>
      case "paragraph--image_beside_text":
        if (components[index + 1] &&components[index].type === components[index + 1].type) {
          return (
            <ImageBesideText
              data={component as DrupalParagraph}
              similarCompBelow={true}
            />
          )
        } else {
          return <ImageBesideText data={component as DrupalParagraph} />
        }
      default:
        return null
    }
  })
}

export default PageComponents
