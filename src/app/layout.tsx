import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import styles from "./layout.module.css"

const noto = Noto_Sans_JP({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "日B池袋ランチ",
  description: "お昼を決めるぞ"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${noto.className} ${styles.container}`}>
        <main className={styles.content}>{children}</main>
      </body>
    </html>
  )
}
