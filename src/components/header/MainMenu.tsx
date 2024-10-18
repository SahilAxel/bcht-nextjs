import { drupal } from "@/lib/drupal"
import NestedMenu from "../navigation/NestedMenu"

export default async function MainMenu() {
  const menu = await drupal.getMenu("main-navigation")
  menu.tree.map((items) => {})
  return (
    <div className="main-menu">
      <NestedMenu items={menu.tree} />
    </div>
  )
}
