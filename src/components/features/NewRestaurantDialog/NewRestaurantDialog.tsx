"use client"

import styles from "./style.module.css"
import { useState } from "react"
import Dialog from "@/components/ui/Dialog"
import { PlusIcon } from "@radix-ui/react-icons"
import Spacer from "@/components/ui/Spacer"
import { createRestaurantDocData } from "@/model/restaurant/createRestaurantDocData"
import { newRestaurantToFirestore } from "@/model/restaurant/converter"
import { useUserValue } from "@/context/UserContext"

export default function NewRestaurantDialog() {
  const [name, setName] = useState<string>("")
  const [url, setUrl] = useState<string>("")
  const [memo, setMemo] = useState<string>("")
  const user = useUserValue()
  const isFormNotFilled = name === ""
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }

  const onChangeMemo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value)
  }

  const onClickSave = async () => {
    setIsDialogOpen(false)

    if (!user) {
      return
    }

    await createRestaurantDocData({
      restaurant: newRestaurantToFirestore({
        name: name,
        url: url,
        memo: memo,
        senderId: user.uid,
        createdAt: new Date()
      })
    })

    resetEnteredContent()
  }

  const resetEnteredContent = () => {
    setName("")
    setUrl("")
  }

  return (
    <Dialog.Root
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <Dialog.Trigger>
        <button className={styles.button}>
          <PlusIcon />
          お店を提案
        </button>
      </Dialog.Trigger>

      <Dialog.Content
        title="お店を提案"
        onClose={resetEnteredContent}
      >
        <fieldset className={styles.Fieldset}>
          <label
            className={styles.Label}
            htmlFor="name"
          >
            お店の名前
          </label>
          <input
            className={styles.Input}
            id="name"
            value={name}
            onChange={onChangeName}
          />
        </fieldset>

        <Spacer size={20} />
        <fieldset className={styles.Fieldset}>
          <label
            className={styles.Label}
            htmlFor="url"
          >
            場所のURL
          </label>
          <input
            className={styles.Input}
            id="url"
            value={url}
            onChange={onChangeUrl}
          />
        </fieldset>

        <Spacer size={20} />
        <fieldset className={styles.Fieldset}>
          <label
            className={styles.Label}
            htmlFor="memo"
          >
            メモ
          </label>
          <input
            className={styles.Input}
            id="memo"
            value={memo}
            onChange={onChangeMemo}
          />
        </fieldset>

        <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
          <button
            onClick={onClickSave}
            disabled={isFormNotFilled}
            className={isFormNotFilled ? styles.buttonDisabled : styles.button}
          >
            投稿
          </button>
        </div>
        <Dialog.Close onClick={resetEnteredContent} />
      </Dialog.Content>
    </Dialog.Root>
  )
}
