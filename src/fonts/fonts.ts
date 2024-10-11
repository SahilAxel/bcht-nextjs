import localFont from "next/font/local"

export const helvetica = localFont({
  src: [
    {path: "Helvetica.woff", weight: "400", style: "normal"},
    {path: "Helvetica_Oblique.woff", weight: "400", style: "italics"},
    {path: "Helvetica_Bold.woff", weight: "700", style: "normal"},
    {path: "Helvetica_BoldOblique.woff", weight: "700", style: "italics"},
  ],
  variable: '--helvetica'
})

export const museo_sans = localFont({
  src: [
    {path: "MuseoSans_300.ttf", weight: "300", style: "normal"},
    {path: "MuseoSans_300_Italic.ttf", weight: "300", style: "italics"},
    {path: "MuseoSans_700.ttf", weight: "700", style: "normal"},
    {path: "MuseoSans_900.ttf", weight: "900", style: "normal"},
    {path: "MuseoSans_900_Italic.ttf", weight: "900", style: "italics"},
  ],
  variable: '--museo-sans'
})