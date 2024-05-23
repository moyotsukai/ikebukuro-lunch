"use client"

import styles from "./style.module.css"
import NewRestaurantDialog from "@/components/features/NewRestaurantDialog"
import RestaurantCard from "@/components/features/RestaurantCard"
import Spacer from "@/components/ui/Spacer"
import { useAuth } from "@/model/auth/useAuth"
import { useRestaurants } from "@/model/restaurant/useRestaurants"
import { useVotingStatus } from "@/model/votingStatus/useVotingStatus"
import { useUsersList } from "@/model/user/useUsersList"
import React, { useState } from "react"
import { setVotingStatus } from "@/model/votingStatus/setVotingStatus"
import Dialog from "@/components/ui/Dialog"
import { updateRestaurant } from "@/model/restaurant/updateRestaurantDocData"
import { Restaurant } from "@/data/Restaurant"

export default function Home() {
  const { user } = useAuth()
  const restaurants = useRestaurants()
  const usersList = useUsersList()
  const isVotingEnabled = useVotingStatus()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

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
        pastAttendantsIds: [...restaurant.attendantsIds, ...restaurant.pastAttendantsIds]
      }
      await updateRestaurant({ docId: restaurant.id, restaurant: modifiedProperties })
    }
  }

  return (
    <div>
      <Spacer size={30} />
      <div className={styles.top}>
        <h1>お店一覧</h1>
        <NewRestaurantDialog />
      </div>
      <Spacer size={20} />
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
      <div>
        {restaurants.map((restaurant, index) => (
          <React.Fragment key={index}>
            <Spacer size={10} />
            <RestaurantCard
              restaurant={restaurant}
              usersList={usersList}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
