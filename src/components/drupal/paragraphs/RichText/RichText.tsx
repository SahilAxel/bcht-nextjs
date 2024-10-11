import Body from "@/components/misc/Body"
import { DrupalParagraph } from "next-drupal"

interface RichTextProps {
  data: DrupalParagraph
}

function RichText({ data }: RichTextProps) {
  return data.field_rich_text ? (
    <div
      className="container-small component__wrapper paragraph--type--rich-text"
    >
      <Body value={data.field_rich_text.processed} />
    </div>
  ) : null
}

export default RichText
