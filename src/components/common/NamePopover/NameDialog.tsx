"use client"

import { setUserDocData } from "@/model/user/setUserDocData"
import styles from "./style.module.css"
import { userState } from "@/states/atoms"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import * as Dialog from "@radix-ui/react-dialog"
import { PersonIcon } from "@radix-ui/react-icons"

export default function NameDialog() {
  const [name, setName] = useState<string>("")
  const [user, setUser] = useRecoilState(userState)
  const isNameNotDetermined = user?.name === undefined || user?.name === ""
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(isNameNotDetermined)

  useEffect(() => {
    setName(user?.name ?? "")
  }, [user])

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onClickSave = async () => {
    setIsDialogOpen(false)

    if (!user) {
      return
    }

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

    await setUserDocData({ userId: user.uid, user: { uid: user.uid, name: name } })
  }

  return (
    <div>
      <Dialog.Root
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <Dialog.Trigger asChild>
          <button className={styles.PersonButton}>
            <PersonIcon />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.DialogOverlay} />
          <Dialog.Content
            onEscapeKeyDown={(e) => {
              e.preventDefault()
            }}
            onPointerDownOutside={(e) => {
              e.preventDefault()
            }}
            onInteractOutside={(e) => {
              e.preventDefault()
            }}
            className={styles.DialogContent}
          >
            <Dialog.Title className={styles.DialogTitle}>ニックネームを設定しよう！</Dialog.Title>
            <fieldset className={styles.Fieldset}>
              <label
                className={styles.Label}
                htmlFor="name"
              >
                ニックネーム
              </label>
              <input
                className={styles.Input}
                id="name"
                value={name}
                onChange={onChangeName}
              />
            </fieldset>
            <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
              <button
                onClick={onClickSave}
                className={name !== "" ? styles.Button : styles.ButtonDisabled}
                disabled={name === ""}
              >
                保存
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
