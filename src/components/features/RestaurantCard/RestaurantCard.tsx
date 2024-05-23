"use client"

import Link from "next/link"
import styles from "./style.module.css"
import { Restaurant } from "@/data/Restaurant"
import Spacer from "@/components/ui/Spacer"
import Dialog from "@/components/ui/Dialog"
import React, { useState } from "react"
import { useAuth } from "@/model/auth/useAuth"
import { updateRestaurantArray } from "@/model/restaurant/updateRestaurantDocData"
import { User } from "@/data/User"
import Avatar from "@/components/ui/Avatar"

type Props = {
  restaurant: Restaurant
  usersList: User[]
}

export default function RestaurantCard({ restaurant, usersList }: Props) {
  const { user } = useAuth()
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)

  const topAttendants =
    restaurant.attendantsIds.length >= 5 ? restaurant.attendantsIds.slice(4) : restaurant.attendantsIds

  const onClickJoin = async () => {
    if (!user) {
      return
    }
    if (restaurant.attendantsIds.includes(user.uid)) {
      await updateRestaurantArray({
        docId: restaurant.id,
        key: "attendantsIds",
        value: user.uid,
        method: "remove"
      })
    } else {
      await updateRestaurantArray({
        docId: restaurant.id,
        key: "attendantsIds",
        value: user.uid,
        method: "union"
      })
    }
  }

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
        {restaurant.attendantsIds.includes(user?.uid ?? "") ? (
          <button
            onClick={onClickJoin}
            className={styles.calcelButton}
          >
            参加済み
          </button>
        ) : (
          <button
            onClick={onClickJoin}
            className={styles.joinButton}
          >
            行きたい
          </button>
        )}
        <Dialog.Root
          open={isOpenDialog}
          onOpenChange={setIsOpenDialog}
        >
          <Dialog.Trigger>
            <div className={styles.attendantsButton}>
              {topAttendants.map((topAttendantId, index) => (
                <Avatar
                  size={20}
                  user={usersList.find((user) => user.uid === topAttendantId)}
                  key={index}
                />
              ))}
              <Spacer
                size={8}
                isInline={true}
              />
              <span>{restaurant.attendantsIds.length}人</span>
            </div>
          </Dialog.Trigger>
          <Dialog.Content title="参加者">
            <div>
              <p>{restaurant.attendantsIds.length}人</p>
              <Spacer size={6} />
              {restaurant.attendantsIds.map((attendantId, index) => (
                <React.Fragment key={index}>
                  <Spacer size={8} />
                  <div className={styles.personNameRow}>
                    <Avatar
                      size={24}
                      user={usersList.find((user) => user.uid === attendantId)}
                    />
                    <Spacer
                      size={8}
                      isInline={true}
                    />
                    {usersList.find((user) => user.uid === attendantId)?.name ?? ""}
                  </div>
                </React.Fragment>
              ))}
            </div>
            <Dialog.Close />
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </div>
  )
}
