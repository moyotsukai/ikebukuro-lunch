"use client"

import Link from "next/link"
import styles from "./style.module.css"
import { Restaurant } from "@/data/Restaurant"
import Spacer from "@/components/ui/Spacer"
import { PersonIcon } from "@radix-ui/react-icons"
import Dialog from "@/components/ui/Dialog"
import { useState } from "react"

type Props = {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: Props) {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)

  const topAttendants =
    restaurant.attendantsIds.length >= 5 ? restaurant.attendantsIds.slice(4) : restaurant.attendantsIds

  const onClickJoin = () => {}

  return (
    <div className={styles.card}>
      <p className={styles.title}>{restaurant.name}</p>
      <div>
        <Link
          href={restaurant.url}
          className={styles.link}
        >
          {restaurant.url}
        </Link>
      </div>
      <Spacer size={12} />
      <div className={styles.buttonContainer}>
        <button className={styles.joinButton}>行きたい</button>
        <Dialog.Root
          open={isOpenDialog}
          onOpenChange={setIsOpenDialog}
        >
          <Dialog.Trigger>
            <div className={styles.attendantsButton}>
              {topAttendants.map((_, index) => (
                <span
                  className={styles.personIcon}
                  key={index}
                >
                  <PersonIcon
                    width={16}
                    height={16}
                  />
                </span>
              ))}
              <span>{restaurant.attendantsIds.length}人</span>
            </div>
          </Dialog.Trigger>
          <Dialog.Content title="参加者">
            <div>
              <p>{restaurant.attendantsIds.length}人</p>
              {restaurant.attendantsIds.map((attendantId, index) => (
                <p key={index}>
                  <PersonIcon
                    width={20}
                    height={20}
                  />
                  {attendantId}
                </p>
              ))}
            </div>
            <Dialog.Close />
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </div>
  )
}
