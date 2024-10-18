"use client"
import React, { useEffect } from "react"
import { DrupalMenuItem } from "next-drupal"
import Link from "next/link"
import next from "next"

type NestedMenuProps = {
  items: DrupalMenuItem[]
  depth?: number
}

export default function NestedMenu({ items, depth = 1 }: NestedMenuProps) {
  useEffect(() => {
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])
  function handleClickOutside(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (!target.closest(".primary-nav__menu--level-1")) {
      document
        .querySelectorAll(
          "a.primary-nav__menu-link--level-1.primary-nav__menu-link--has-children"
        )
        .forEach(function (element) {
          element.classList.remove("active")
        })
      document
        .querySelectorAll("ul.primary-nav__menu--level-2")
        .forEach(function (e) {
          const element = e as HTMLElement
          element.style.cssText = "display: none"
        })
    }
  }

  function toggleMenu(e: React.MouseEvent<HTMLElement>, depth: number): void {
    e.preventDefault()
    if (depth == 1) {
      const targetLink = e.currentTarget as HTMLElement
      const nextSibling = targetLink.nextElementSibling as HTMLElement
      // Close any already open sub-menu if it doesn't belong to current targetLink
      document
        .querySelectorAll(
          "a.primary-nav__menu-link--level-1.primary-nav__menu-link--has-children.active"
        )
        .forEach((element) => {
          if (element != targetLink) {
            element.classList.remove("active")
            const nextSibling = element.nextElementSibling as HTMLElement
            if (nextSibling) nextSibling.style.cssText = "display: none"
          }
        })

      if (targetLink.classList.contains("active")) {
        targetLink.classList.remove("active")
        if (nextSibling) nextSibling.style.cssText = "display: none"
      } else {
        targetLink.classList.add("active")
        if (nextSibling) nextSibling.style.cssText = "display: block"
      }
    }
  }

  return (
    <ul className={`menu primary-nav__menu primary-nav__menu--level-${depth}`}>
      {items.map((item) => {
        return item.enabled ? (
          <li
            className={`primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-${depth} ${item.items && "primary-nav__menu-item--has-children"}`}
            key={item.id}
          >
            <Link href={item.url} passHref legacyBehavior>
              <a
                className={`primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-${depth} ${item.items && "primary-nav__menu-link--has-children"}`}
                onClick={item.items ? (e) => toggleMenu(e, depth) : undefined}
              >
                <span
                  className={`primary-nav__menu-link-inner primary-nav__menu-link-inner--level-${depth}`}
                >
                  {item.title}
                </span>
              </a>
            </Link>
            {item.items && <NestedMenu items={item.items} depth={depth + 1} />}
          </li>
        ) : null
      })}
    </ul>
  )
}
