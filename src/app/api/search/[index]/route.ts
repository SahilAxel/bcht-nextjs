import { drupal } from "@/lib/drupal"
import { DrupalNode, JsonApiResponse } from "next-drupal"
import { NextRequest } from "next/server"

interface SearchResultsAPIResponse extends JsonApiResponse {
  meta: {
    count: number
  }
  data: DrupalNode[]
}

export async function POST(
  request: NextRequest,
  { params: { index } }: { params: { index: string } }
) {
  try {
    const body = await request.json()
    try {
      const results: SearchResultsAPIResponse = await drupal.getSearchIndex(
        index as string,
        {
          params: body.params,
          deserialize: false,
        }
      )
      return Response.json({
        total: results.meta.count,
        items: drupal.deserialize(results),
      })
    } catch (error) {
      return Response.json(`Index error: ${error}`)
    }
  } catch (error) {
    return Response.json(error)
  }
}
