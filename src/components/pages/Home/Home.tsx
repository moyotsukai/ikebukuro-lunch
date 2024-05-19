"use client"

import { PlusIcon } from "@radix-ui/react-icons"
import styles from "./style.module.css"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    //TODO: お昼案一覧取得
  }, [])

  return (
    <div>
      <h1>お店一覧</h1>
      <button>
        <PlusIcon />
      </button>
    </div>
  )
}
