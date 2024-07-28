import { CheckIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import styles from "./style.module.css"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Restaurant } from "@/data/Restaurant"
import { updateRestaurant } from "@/model/restaurant/updateRestaurantDocData"
import { asyncTask } from "@/utils/asyncTask"
import Dialog from "@/components/ui/Dialog"
import Spacer from "@/components/ui/Spacer"
import { useUserValue } from "@/context/UserContext"

type Props = {
  restaurant: Restaurant
}

export default function RestaurantMenu({ restaurant }: Props) {
  const user = useUserValue()
  const [isMobileOrder, setIsMobileOrder] = useState<boolean>(restaurant.orderStyle === "mobile")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    asyncTask(async () => {
      if (isMobileOrder) {
        await updateRestaurant({
          docId: restaurant.id,
          restaurant: {
            orderStyle: "mobile"
          }
        })
      } else {
        await updateRestaurant({
          docId: restaurant.id,
          restaurant: {
            orderStyle: "takeout"
          }
        })
      }
    })
  }, [isMobileOrder])

  const onClickEdit = () => {
    setIsEditDialogOpen(true)
  }

  const onClickHide = async () => {
    await updateRestaurant({
      docId: restaurant.id,
      restaurant: {
        isHidden: true
      }
    })
  }

  const onClickToggleVotingStatus = async () => {
    if (restaurant.votingStatus === "open") {
      await updateRestaurant({
        docId: restaurant.id,
        restaurant: {
          votingStatus: "closed"
        }
      })
    } else {
      await updateRestaurant({
        docId: restaurant.id,
        restaurant: {
          votingStatus: "open"
        }
      })
    }
  }

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={styles.trigger}>
            <DotsHorizontalIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={styles.content}
            sideOffset={5}
          >
            <DropdownMenu.CheckboxItem
              className={styles.checkboxItem}
              checked={isMobileOrder}
              onCheckedChange={setIsMobileOrder}
            >
              <DropdownMenu.ItemIndicator className={styles.itemIndicator}>
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              {isMobileOrder ? "モバイルオーダー" : "モバイルオーダーに変更"}
            </DropdownMenu.CheckboxItem>

            <DropdownMenu.Item
              onClick={onClickEdit}
              className={styles.item}
            >
              編集
            </DropdownMenu.Item>

            <DropdownMenu.Item
              onClick={onClickHide}
              className={styles.item}
            >
              非表示にする
            </DropdownMenu.Item>

            {user?.role === "mentor" && (
              <DropdownMenu.Item
                onClick={onClickToggleVotingStatus}
                className={styles.item}
              >
                {restaurant.votingStatus === "open" ? "締め切る" : "再開する"}
              </DropdownMenu.Item>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <EditRestaurantDialog
        restaurant={restaurant}
        isDialogOpen={isEditDialogOpen}
        setIsDialogOpen={setIsEditDialogOpen}
      />
    </>
  )
}

function EditRestaurantDialog({
  restaurant,
  isDialogOpen,
  setIsDialogOpen
}: {
  restaurant: Restaurant
  isDialogOpen: boolean
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [name, setName] = useState<string>(restaurant.name)
  const [url, setUrl] = useState<string>(restaurant.url)
  const [memo, setMemo] = useState<string>(restaurant.memo)
  const user = useUserValue()
  const isFormNotFilled = name === ""

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

    await updateRestaurant({
      docId: restaurant.id,
      restaurant: {
        name: name,
        url: url,
        memo: memo
      }
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
        <button style={{ display: "none" }} />
      </Dialog.Trigger>

      <Dialog.Content
        title="お店を編集"
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
            保存
          </button>
        </div>
        <Dialog.Close onClick={resetEnteredContent} />
      </Dialog.Content>
    </Dialog.Root>
  )
}
