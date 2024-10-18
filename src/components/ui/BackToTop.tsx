"use client"

import React, { useEffect, useRef } from "react"

function BackToTop() {
  const backToTopRef = useRef<HTMLDivElement>(null)

  function scrollEvent() {
    if (window.scrollY > 100) {
      backToTopRef.current!.style.display = "block"
    } else {
      backToTopRef.current!.style.display = "none"
    }
  }

  function clickEvent() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  function keypressEvent(e: KeyboardEvent) {
    if (e.key === "Enter" || e.keyCode === 13) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }

  useEffect(() => {
    const backToTop = backToTopRef.current
    backToTop!.style.display = "none"

    window.addEventListener("scroll", scrollEvent)

    backToTop!.addEventListener("click", clickEvent)

    backToTop!.addEventListener("keypress", keypressEvent)

    return () => {
      window.removeEventListener("scroll", scrollEvent)
      backToTop!.removeEventListener("click", clickEvent)
      backToTop!.removeEventListener("keypress", keypressEvent)
    }
  }, [])
  function handleBackToTop() {}

  return (
    <div
      className="back-to-top"
      tabIndex={0}
      role="link"
      data-once="backToTop backToTopkeypress"
      ref={backToTopRef}
    >
      ↑
    </div>
  )
}

export default BackToTop
