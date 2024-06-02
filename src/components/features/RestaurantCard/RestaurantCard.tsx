"use client"

import Link from "next/link"
import styles from "./style.module.css"
import { Restaurant } from "@/data/Restaurant"
import Spacer from "@/components/ui/Spacer"
import React from "react"
import { useAuth } from "@/model/auth/useAuth"
import { updateRestaurantArray } from "@/model/restaurant/updateRestaurantDocData"
import { useVotingStatus } from "@/model/votingStatus/useVotingStatus"
import UsersDialog from "../UsersDialog"

type Props = {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: Props) {
  const { user } = useAuth()
  const isVotingEnabled = useVotingStatus()

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
        {isVotingEnabled ? (
          restaurant.attendantsIds.includes(user?.uid ?? "") ? (
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
          )
        ) : (
          <button
            disabled={true}
            className={styles.waitingMessageButton}
          >
            まもなく投票開始
          </button>
        )}
        <UsersDialog userIds={restaurant.attendantsIds} />
      </div>
    </div>
  )
}
