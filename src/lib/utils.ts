export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(input: string) {
  return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${input}`
}

export function stripAndClean(html: string): string {
  return html.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' ').trim();
}

export function getArticlePublicationDate(date: string): string {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return formattedDate
}