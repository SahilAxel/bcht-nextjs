"use client"
import { DrupalParagraph } from "next-drupal"
import "./accordion.css"
import Link from "next/link"
import Body from "@/components/misc/Body"

interface AccordionProps {
  data: DrupalParagraph
}

function Accordion({ data }: AccordionProps) {
  return (
    <div className="container-small component__wrapper paragraph--type--accordion">
      {data.field_heading_text && (
        <div className="field--name-field-heading-text">
          {data.field_heading_text}
        </div>
      )}
      {data.field_accordion_items && (
        <AccordionItems items={data.field_accordion_items} />
      )}
      {data.field_accordion_link && (
        <div className="field field--name-field-accordion-link field--type-link field--label-hidden field__item">
          <Link href={data.field_accordion_link.full_url}>
            {data.field_accordion_link.title}
          </Link>
        </div>
      )}
    </div>
  )
}

interface AccordionItemProps {
  items: DrupalParagraph[]
}

function AccordionItems({ items }: AccordionItemProps) {
  function toggleAccordion(e: React.MouseEvent<HTMLElement>) {
    const button = e.currentTarget
    const accordionItem = button.closest(".paragraph--type--accordion-item")
    const accordionDescription = accordionItem?.querySelector(
      ".accordion-description"
    ) as HTMLElement

    accordionItem?.classList.toggle("open")
    button.classList.toggle("is-expanded")
    button.setAttribute("aria-expanded", "true")

    if (button.classList.contains("is-expanded")) {
      button.setAttribute("aria-expanded", "true")
      accordionDescription?.setAttribute("aria-hidden", "false")
      accordionDescription.style.cssText = "display:block"
    } else {
      button.setAttribute("aria-expanded", "false")
      accordionDescription?.setAttribute("aria-hidden", "true")
      accordionDescription.style.cssText = "display:none"
    }
  }

  return (
    <div className="field--name-field-accordion-items">
      {items.map((item) => (
        <div key={item.id} className="field__item">
          <div className="paragraph--type--accordion-item">
            <h3>
              <button
                aria-expanded="false"
                className="accordion-trigger"
                onClick={(e) => toggleAccordion(e)}
              >
                <span className="field--name-field-heading accordion-title">
                  {item.field_heading}
                </span>
              </button>
            </h3>
            <div className="accordion-description" aria-hidden="true">
              <div
                className="field--name-field-description"
              >
                <Body value={item.field_description.processed} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Accordion
