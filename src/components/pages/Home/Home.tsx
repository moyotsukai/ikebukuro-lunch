"use client"

import NamePopover from "@/components/common/NamePopover"
import styles from "./style.module.css"
import { userState } from "@/states/atoms"
import { useRecoilValue } from "recoil"

export default function Home() {
  const user = useRecoilValue(userState)
  const isNameNotDetermined = user?.name === undefined || user?.name === ""

  return (
    <div>
      {isNameNotDetermined && <NamePopover />}
      Hello, {user?.name}
    </div>
  )
}
