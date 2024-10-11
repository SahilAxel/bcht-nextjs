"use client"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import React, { useEffect } from "react"

interface PaginationProps {
  totalItems: string
  limit: number
}

export default function Pagination({ totalItems, limit }: PaginationProps) {
  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const currentPage = Number(searchParams.get("page")) || 1
  const totalPages = Math.ceil(Number(totalItems) / limit)

  useEffect(() => {
    const searchResultsElement = document.getElementById('searchResults');
    if (searchResultsElement) {
      searchResultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  function updatePage(page: number) {
    const newParams = new URLSearchParams(searchParams)
    newParams.set("page", page.toString())
    replace(`${pathname}?${newParams.toString()}`, { scroll: false })
    const searchResultsElement = document.getElementById('searchResults');
  }

  return (
    <nav className="pager" role="navigation">
      <ul className="pager__items js-pager__items">
        {currentPage > 1 && (
          <li className="pager__item pager__item--previous">
            <a
              aria-label="Previous page"
              onClick={() => updatePage(currentPage - 1)}
            >
              Previous
            </a>
          </li>
        )}
        {Array.from({ length: totalPages }).map((_, index) => (
          <li key={index} className={`pager__item ${currentPage === index + 1 ? "is-active" : ""}`}>
            <a
              aria-label={`Page ${index + 1}`}
              onClick={() => updatePage(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        ))}
        {currentPage < totalPages && (
          <li className="pager__item pager__item--next">
            <a aria-label="Next page" onClick={() => updatePage(currentPage + 1)}>
              Next
            </a>
          </li>
        )}
      </ul>
    </nav>
  )
}
