"use client"

import styles from "./style.module.css"
import NewRestaurantDialog from "@/components/features/NewRestaurantDialog"
import RestaurantCard from "@/components/features/RestaurantCard"
import Spacer from "@/components/ui/Spacer"
import { useRestaurants } from "@/model/restaurant/useRestaurants"
import { useVotingStatus } from "@/model/votingStatus/useVotingStatus"
import React, { useState } from "react"
import { setVotingStatus } from "@/model/votingStatus/setVotingStatus"
import Dialog from "@/components/ui/Dialog"
import { updateRestaurant } from "@/model/restaurant/updateRestaurantDocData"
import { Restaurant } from "@/data/Restaurant"
import UsersDialog from "@/components/features/UsersDialog"
import { useUsersList } from "@/model/user/useUsersList"
import { useUserValue } from "@/context/UserContext"

export default function Home() {
  const user = useUserValue()
  const restaurants = useRestaurants()
  const isVotingEnabled = useVotingStatus()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const users = useUsersList()
  const usersDeterminedIds = restaurants.map((restauran) => restauran.attendantsIds).flat()
  const usersDetermined = users.filter(($0) => {
    if (usersDeterminedIds.includes($0.uid)) {
      return $0
    }
  })

  const onClickStart = async () => {
    await setVotingStatus({ votingStatus: { isVotingEnabled: true } })
  }

  const onClickReset = async () => {
    setIsDialogOpen(false)
    await setVotingStatus({ votingStatus: { isVotingEnabled: false } })
    for (let i = 0; i < restaurants.length; i++) {
      const restaurant = restaurants[i]
      const modifiedProperties: Partial<Restaurant> = {
        attendantsIds: [],
        pastAttendantsIds: [...restaurant.attendantsIds, ...restaurant.pastAttendantsIds],
        guidesIds: [],
        votingStatus: "open"
      }
      await updateRestaurant({ docId: restaurant.id, restaurant: modifiedProperties })
    }
  }

  const usersNotDeterminedIds = Array.from(new Map(users.map((user) => [user.name, user])).values())
    .filter((user) => {
      if (usersDeterminedIds.includes(user.uid)) {
        return false
      } else {
        return true
      }
    })
    .filter((user) => {
      const usersDeterminedNames = usersDetermined.map(($0) => $0.name)
      if (usersDeterminedNames.includes(user.name)) {
        return false
      } else {
        return true
      }
    })
    .map((user) => user.uid)

  return (
    <div>
      <Spacer size={30} />
      <div className={styles.top}>
        <h1>お店一覧</h1>
        <NewRestaurantDialog />
      </div>
      <Spacer size={30} />
      {user?.role === "mentor" && (
        <div className={styles.mentorArea}>
          <p>メンター向けエリア</p>
          <Spacer size={30} />
          {isVotingEnabled ? (
            <Dialog.Root
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
            >
              <Dialog.Trigger>
                <button className={styles.resetButton}>投票をリセット</button>
              </Dialog.Trigger>
              <Dialog.Content title="本当にリセットしますか？">
                <p>
                  投票をリセットすると投票はできなくなり、全ての投票の結果が削除されます。お昼ご飯を買い終わった後にリセットしてください。
                </p>
                <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
                  <button
                    onClick={onClickReset}
                    className={styles.button}
                  >
                    リセット
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Root>
          ) : (
            <button
              onClick={onClickStart}
              className={styles.startButton}
            >
              募集開始
            </button>
          )}
        </div>
      )}
      <Spacer size={20} />

      {isVotingEnabled && (
        <div className={styles.topInfoArea}>
          <span>未投票</span>
          <UsersDialog
            title="未投票"
            userIds={usersNotDeterminedIds}
          />
        </div>
      )}

      <div>
        {restaurants.map((restaurant, index) => (
          <React.Fragment key={index}>
            <Spacer size={10} />
            <RestaurantCard restaurant={restaurant} />
          </React.Fragment>
        ))}
      </div>
      <Spacer size={40} />
    </div>
  )
}
