"use client"
import { DrupalNode } from "next-drupal"
import { useState } from "react"

function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<DrupalNode[]>([])

  return <div>SearchResults</div>
}

export default SearchResults
