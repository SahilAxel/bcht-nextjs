import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { getDraftData } from "next-drupal/draft"
import { Article } from "@/components/drupal/Article"
import { BasicPage } from "@/components/drupal/BasicPage"
import { drupal } from "@/lib/drupal"
import type { Metadata, ResolvingMetadata } from "next"
import type { DrupalNode, JsonApiParams } from "next-drupal"
import { LandingPage } from "@/components/drupal/LandingPage"
import { Event } from "@/components/drupal/Event"

async function getNode(slug: string[]) {
  const path = `/${slug.join("/")}`
  const params: JsonApiParams = {}

  const draftData = getDraftData()

  if (draftData.path === path) {
    params.resourceVersion = draftData.resourceVersion
  }

  // Translating the path also allows us to discover the entity type.
  const translatedPath = await drupal.translatePath(path)

  if (!translatedPath) {
    throw new Error("Resource not found", { cause: "NotFound" })
  }

  const type = translatedPath.jsonapi?.resourceName!
  const uuid = translatedPath.entity.uuid

  if (type === "node--landing_page" || type === "node--event" || type === "node--page") {
    params.include =
      "field_hero.field_image.field_media_image,field_components.field_image.field_media_image,field_components.field_card_items.field_image.field_media_image,field_components.field_impact_stats_items,field_components.field_node_reference,field_components.field_node_reference.field_hero.field_image.field_media_image,field_components.field_featured_events.field_event_reference.field_hero.field_image.field_media_image,field_components.field_featured_events.field_image.field_media_image,field_components.field_accordion_items,field_components.field_icon.field_media_image,field_components.field_article_reference.field_hero.field_image.field_media_image,field_components.field_topics"
  }

  if (type === "node--article") {
    params.include =
      "field_hero.field_image.field_media_image,field_components.field_image.field_media_image,field_components.field_icon.field_media_image,field_related_content.field_topics,field_call_to_action_cta_banner"
  }

  const resource = await drupal.getResource<DrupalNode>(type, uuid, {
    params,
  })

  if (!resource) {
    throw new Error(
      `Failed to fetch resource: ${translatedPath?.jsonapi?.individual}`,
      {
        cause: "DrupalError",
      }
    )
  }

  return resource
}

type NodePageParams = {
  slug: string[]
}
type NodePageProps = {
  params: NodePageParams
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params: { slug } }: NodePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let node
  try {
    node = await getNode(slug ? slug : ["/"])
  } catch (e) {
    // If we fail to fetch the node, don't return any metadata.
    return {}
  }

  return {
    title: node.title,
  }
}

const RESOURCE_TYPES = ["node--page", "node--article"]

export async function generateStaticParams(): Promise<NodePageParams[]> {
  const resources = await drupal.getResourceCollectionPathSegments(
    RESOURCE_TYPES,
    {
      // The pathPrefix will be removed from the returned path segments array.
      // pathPrefix: "/blog",
      // The list of locales to return.
      // locales: ["en", "es"],
      // The default locale.
      // defaultLocale: "en",
    }
  )

  return resources.map((resource) => {
    // resources is an array containing objects like: {
    //   path: "/blog/some-category/a-blog-post",
    //   type: "node--article",
    //   locale: "en", // or `undefined` if no `locales` requested.
    //   segments: ["blog", "some-category", "a-blog-post"],
    // }
    return {
      slug: resource.segments,
    }
  })
}

export default async function NodePage({
  params: { slug },
  searchParams,
}: NodePageProps) {
  const isDraftMode = draftMode().isEnabled

  let node
  try {
    node = await getNode(slug ? slug : ["/"])
  } catch (error) {
    // If getNode throws an error, tell Next.js the path is 404.
    notFound()
  }

  // If we're not in draft mode and the resource is not published, return a 404.
  if (!isDraftMode && node?.status === false) {
    notFound()
  }

  return (
    <>
      {node.type === "node--page" && <BasicPage node={node} />}
      {node.type === "node--article" && <Article node={node} />}
      {node.type === "node--landing_page" && <LandingPage node={node} />}
      {node.type === "node--event" && <Event node={node} />}
    </>
  )
}
