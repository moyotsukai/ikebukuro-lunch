import { CheckIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import styles from "./style.module.css"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useEffect, useState } from "react"
import { Restaurant } from "@/data/Restaurant"
import { updateRestaurant } from "@/model/restaurant/updateRestaurantDocData"
import { asyncTask } from "@/utils/asyncTask"

type Props = {
  restaurant: Restaurant
}

export default function RestaurantMenu({ restaurant }: Props) {
  const [isMobileOrder, setIsMobileOrder] = useState<boolean>(restaurant.orderStyle === "mobile")

  useEffect(() => {
    asyncTask(async () => {
      console.log(isMobileOrder)
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

  const onClickEdit = () => {}

  const onClickCloseVoting = () => {}

  return (
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
            onClick={onClickCloseVoting}
            className={styles.item}
          >
            締め切る
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
