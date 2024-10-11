import parse, { HTMLReactParserOptions, Element, domToReact } from "html-react-parser"
import React from "react"
import Image from "next/image"
import Link from "next/link"

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    // Look for an img tag and replace it with Image.
    if (domNode instanceof Element && domNode.name === "img") {
      const { src, alt, width, height } = domNode.attribs

      return (
        <>
          <Image
            src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${src}`}
            width={parseInt(width)}
            height={parseInt(height)}
            alt={alt}
          />
        </>
      )
    }

    if (domNode instanceof Element && domNode.name === "a") {
      const { href, class: className } = domNode.attribs

      return (
        <Link href={href} passHref legacyBehavior>
          <a className={className}>{domToReact(domNode.children as Element[])}</a>
        </Link>
      )
    }
  },
}

function Body({ value }: { value: string }) {
  return <>{parse(value, options)}</>
}

export default Body
