"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useRef } from "react"
import "@/styles/search-result-page.css"

interface SearchFormProps {
  handleReset?: (e: React.MouseEvent<HTMLSpanElement>) => void
}

export default function SearchForm({ handleReset }: SearchFormProps) {
  const queryRef = useRef<HTMLInputElement>(null)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleDefaultSearchReset(e: React.MouseEvent<HTMLSpanElement>) {}

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (queryRef.current?.value) {
      params.set("search", queryRef.current.value)
      params.delete("page")
    } else {
      params.delete("search")
    }
    replace(`/search?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="search-form-wrapper">
      <form onSubmit={handleSearch}>
        <div className="form-item-search">
          <input
            type="text"
            name="searchQuery"
            id="searchQuery"
            placeholder="Search..."
            className="form-text"
            ref={queryRef}
            defaultValue={searchParams.get("search")?.toString()}
          />
        </div>
        <span
          className="reset hidden"
          tabIndex={0}
          role="button"
          aria-label="Reset and Close Search"
          onClick={
            handleReset
              ? (e) => handleReset(e)
              : (e) => handleDefaultSearchReset(e)
          }
        >
          Reset
        </span>
        <div className="form-actions">
          <input type="submit" value="Search" className="form-submit" />
        </div>
      </form>
    </div>
  )
}
