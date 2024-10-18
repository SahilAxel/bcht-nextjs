"use client"

import { ReactNode, Suspense, useEffect, useRef, useState } from "react"
import "./header.css"
import Link from "next/link"
import SearchForm from "@/components/ui/SearchForm"

interface HeaderProps {
  logo: ReactNode
  utilityMenu: ReactNode
  mainMenu: ReactNode
}

export default function Header({ logo, utilityMenu, mainMenu }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const searchWrapperRef = useRef<HTMLDivElement>(null)
  const searchIconRef = useRef<HTMLDivElement>(null)

  const [scrollTopClass, setScrollTopClass] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    let lastScrollTop = 60
    function handleScroll() {
      if (window.scrollY > 60) {
        const st = window.scrollY
        if (st > lastScrollTop) {
          // downscroll code
          setScrollTopClass("hideupperHeader")
        } else {
          // upscroll code
          setScrollTopClass("")
        }
        lastScrollTop = st
      }
    }
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("click", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("click", handleClickOutside)
    }
  }, [])

  function handleClickOutside(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (
      !target.closest(".search__wrapper") &&
      !target.closest(".search__icon")
    ) {
      searchIconRef.current?.classList.remove("active")
      searchWrapperRef.current?.classList.remove("active")
      headerRef.current
        ?.querySelector(".header_top_wrapper")
        ?.classList.remove("active-search")
    }
  }

  function handleSearchIconClick(e: React.MouseEvent<HTMLDivElement>) {
    const searchIcon = e.currentTarget
    if (searchIcon.classList.contains("active")) {
      searchIcon.classList.remove("active")
      searchWrapperRef.current?.classList.remove("active")
      headerRef.current
        ?.querySelector(".header_top_wrapper")
        ?.classList.remove("active-search")
    } else {
      searchIcon.classList.add("active")
      searchIcon.nextElementSibling?.classList.add("active")
      headerRef.current
        ?.querySelector(".header_top_wrapper")
        ?.classList.add("active-search")
      const searchInput = searchWrapperRef.current?.querySelector(
        "input"
      ) as HTMLInputElement
      setTimeout(function () {
        searchInput.focus()
      }, 500)
    }
  }

  function handleSearchReset(e: React.MouseEvent<HTMLSpanElement>) {
    searchIconRef.current?.classList.remove("active")
    searchWrapperRef.current?.classList.remove("active")
    headerRef.current
      ?.querySelector(".header_top_wrapper")
      ?.classList.remove("active-search")
  }

  return (
    <header
      role="banner"
      className={`clearfix header_wrapper ${scrollTopClass}`}
      ref={headerRef}
    >
      <div className="main-header">
        <div className="header_top_wrapper">
          <div className="container">
            <div className="header_top__container">
              <div className="search_box_wrapper">
                <div
                  tabIndex={0}
                  className="search__icon"
                  ref={searchIconRef}
                  role="button"
                  data-once="search__wrapper search__wrapperr"
                  onClick={(e) => handleSearchIconClick(e)}
                >
                  search button
                </div>
                <div className="search__wrapper" ref={searchWrapperRef}>
                  <Suspense>
                    <SearchForm handleReset={handleSearchReset} />
                  </Suspense>
                </div>
              </div>
              {utilityMenu}
              <div className="cta-btn">
                <Link href="/node/7" rel="nofollow" target="_blank">
                  Give Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="header_bottom_wrapper">
          <div className="container">
            <div className="header_bottom__container">
              {logo}
              {mainMenu}
              <div
                id="menuToggle"
                role="button"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`${mobileMenuOpen ? "active" : ""}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mobile-menu-wrapper"
          style={{ display: mobileMenuOpen ? "block" : "none" }}
        >
          <div className="cta-btn">
            <a href="/node/7" rel="nofollow" target="_blank">
              Give Now
            </a>
          </div>
          {mainMenu}
          <div className="mobile_bottom_wrapper">{utilityMenu}</div>
        </div>
      </div>
    </header>
  )
}
