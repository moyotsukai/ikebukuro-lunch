"use client"

import styles from "./style.module.css"
import SignInProvider from "@/components/features/SignInProvider"
import NameDialog from "../NameDialog/NameDialog"

type Props = {
  children: React.ReactNode
}

export default function AppContainer({ children }: Props) {
  return (
    <SignInProvider>
      <header className={styles.header}>
        <div className={styles.title}>日B池袋ごはん！</div>
        <NameDialog />
      </header>
      <main className={styles.mainContainer}>{children}</main>
    </SignInProvider>
  )
}
