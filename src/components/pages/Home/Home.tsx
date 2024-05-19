"use client"

import styles from "./style.module.css"
import { useEffect } from "react"
import NewRestaurantDialog from "@/components/features/NewRestaurantDialog"
import Spacer from "@/components/ui/Spacer"

export default function Home() {
  useEffect(() => {
    //TODO: お昼案一覧取得
  }, [])

  return (
    <div>
      <Spacer size={30} />
      <div className={styles.top}>
        <h1>お店一覧</h1>
        <NewRestaurantDialog />
      </div>
    </div>
  )
}
