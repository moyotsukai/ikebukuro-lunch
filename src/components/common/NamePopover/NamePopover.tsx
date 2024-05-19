"use client"

import styles from "./style.module.css"
import { useAuth } from "@/model/auth/useAuth"
import { userState } from "@/states/atoms"
import { useState } from "react"
import { useRecoilState } from "recoil"

export default function NamePopover() {
  const { user: userData } = useAuth()
  const [name, setName] = useState<string>("")
  const [user, setUser] = useRecoilState(userState)

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onClickSave = () => {
    setUser((currentValue) => {
      if (!currentValue?.uid) {
        return currentValue
      } else {
        return {
          uid: currentValue.uid,
          name: name
        }
      }
    })
  }

  return (
    <div>
      {!userData?.name ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={onChangeName}
          />
          <button onClick={onClickSave}>保存</button>
        </div>
      ) : null}
    </div>
  )
}
