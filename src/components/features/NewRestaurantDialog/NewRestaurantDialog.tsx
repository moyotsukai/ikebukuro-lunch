"use client"

import styles from "./style.module.css"
import { userState } from "@/states/atoms"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons"
import Spacer from "@/components/ui/Spacer"
import { createRestaurantDocData } from "@/model/user/createRestaurantDocData"

export default function NewRestaurantDialog() {
  const [name, setName] = useState<string>("")
  const [url, setUrl] = useState<string>("")
  const user = useRecoilValue(userState)
  const isFormNotFilled = name === "" || url === ""
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }

  const onClickSave = async () => {
    setIsDialogOpen(false)

    if (!user) {
      return
    }

    await createRestaurantDocData({
      restaurant: {
        name: name,
        url: url,
        attendantsIds: [],
        senderId: user.uid
      }
    })

    setName("")
    setUrl("")
  }

  return (
    <Dialog.Root
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <Dialog.Trigger asChild>
        <button className={styles.createButton}>
          <PlusIcon />
          お店を提案
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>お店を提案</Dialog.Title>
          <Spacer size={30} />
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

          <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
            <button
              onClick={onClickSave}
              className={isFormNotFilled ? styles.ButtonDisabled : styles.Button}
              disabled={isFormNotFilled}
            >
              投稿
            </button>
          </div>
          <Dialog.Close asChild>
            <button
              className={styles.IconButton}
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
