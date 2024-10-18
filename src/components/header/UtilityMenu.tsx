import { drupal } from "@/lib/drupal"
import Link from "next/link"

export default async function UtilityMenu() {
  const menu = await drupal.getMenu("utitlity-menu")
  return (
    <div className="utitlity-menu">
      <ul>
        {menu.items.map((item) =>
          item.enabled ? (
            <li key={item.id}>
              <Link href={item.url}>{item.title}</Link>
            </li>
          ) : null
        )}
      </ul>
    </div>
  )
}