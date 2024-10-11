"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useRef } from "react"
import "@/styles/search-result-page.css"

export default function Search() {
  const queryRef = useRef<HTMLInputElement>(null)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (queryRef.current?.value) {
      params.set("search", queryRef.current.value)
      params.delete("page")
    } else {
      params.delete("search")
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="search-form-wrapper">
      <form onSubmit={handleSearch}>
        <div className="form-item-search">
          <input
            type="search"
            name="searchQuery"
            id="searchQuery"
            placeholder="Search..."
            className="form-text"
            ref={queryRef}
            defaultValue={searchParams.get('search')?.toString()}
          />
        </div>
        <div className="form-actions">
          <input type="submit" value="Search" className="form-submit" />
        </div>
      </form>
    </div>
  )
}
