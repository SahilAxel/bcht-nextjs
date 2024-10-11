import "./header.css"
import Link from "next/link"
import { drupal } from "@/lib/drupal"
import Image from "next/image"
import NestedMenu from "@/components/navigation/NestedMenu"
export default function Header() {
  return (
    <header role="banner" className="clearfix header_wrapper">
      <div className="main-header">
        <div className="header_top_wrapper">
          <div className="container">
            <div className="header_top__container">
              <UtilityMenu />
              <div className="cta-btn"><Link href="/node/7" rel="nofollow" target="_blank">Give Now</Link></div>
            </div>
          </div>
        </div>
        <div className="header_bottom_wrapper">
          <div className="container">
            <div className="header_bottom__container">
              <Logo />
              <MainMenu />
            </div>
            <div
              id="menuToggle"
              role="button"
              aria-label="Open menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

async function Logo() {
  return (
    <div className="header_logo">
      <Link href="/" rel="home" title="Boston Children's Hospital Trust">
        <Image
          src={"/logo.webp"}
          alt="Boston Children's Hospital Trust"
          width={1260}
          height={144}
        />
      </Link>
    </div>
  )
}

async function UtilityMenu() {
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

async function MainMenu() {
  const menu = await drupal.getMenu("main-navigation")
  menu.tree.map((items) => {})
  return (
    <div className="main-menu">
      <NestedMenu items={menu.tree} />
    </div>
  )
}
