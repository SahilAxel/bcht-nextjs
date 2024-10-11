import { NextDrupal } from "next-drupal"

const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string
const clientId = process.env.DRUPAL_CLIENT_ID as string
const clientSecret = process.env.DRUPAL_CLIENT_SECRET as string

export const drupal = new NextDrupal(baseUrl, {
  auth: {
    clientId,
    clientSecret,
  },
  frontPage: "/home",
  debug: true,
})

export function getFileUrl(relativePath: string) {
  return `${baseUrl}${relativePath}`
}

export function getAbsoluteUrl(url: string) {
  if (new URL(url, baseUrl).hostname == null) {
    return baseUrl + url
  }

  return url
}
