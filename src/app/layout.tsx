import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import styles from "./layout.module.css"
import Head from "next/head"
import AppContainer from "@/components/common/AppContainer"

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
      <Head>
        <meta
          name="robots"
          content="noindex"
        />
      </Head>
      <body className={`${noto.className} ${styles.container}`}>
        <main className={styles.content}>
          <AppContainer>{children}</AppContainer>
        </main>
      </body>
    </html>
  )
}
