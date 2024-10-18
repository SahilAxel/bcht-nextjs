import { DraftAlert } from "@/components/misc/DraftAlert"
import Header from "@/components/header/Header"
import type { Metadata } from "next"
import { Suspense, type ReactNode } from "react"
import "@/styles/globals.css"
import "@/styles/rich-text.css"
import { helvetica, museo_sans } from "@/fonts/fonts"
import Footer from "@/components/footer/Footer"
import UtilityMenu from "@/components/header/UtilityMenu"
import MainMenu from "@/components/header/MainMenu"
import Logo from "@/components/header/Logo"
import Script from "next/script"

export const metadata: Metadata = {
  title: {
    default: "Boston Children's Hospital Trust",
    template: "%s | Boston Childrens Hospital Trust",
  },
  description:
    "Optional intro text aimed at helping prospectives understand and form an emotional connection with your work.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={`${helvetica.variable} ${museo_sans.variable}`}>
      <body>
        <DraftAlert />
        <div className="layout-container">
            <Header
              logo={<Logo />}
              mainMenu={<MainMenu />}
              utilityMenu={<UtilityMenu />}
            />
          <main role="main" className="main-content-wrapper">
            <div className="layout-content">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
      <Script id="resize-header">
        {`
        let headerHeight = document.querySelector('.header_wrapper').offsetHeight;
        document.querySelector('.main-content-wrapper').style.paddingTop = headerHeight + 'px';
        window.addEventListener('resize', function () {
        headerHeight = document.querySelector('.header_wrapper').offsetHeight;
        document.querySelector('.main-content-wrapper').style.paddingTop = headerHeight + 'px';
        });`}
      </Script>
    </html>
  )
}
