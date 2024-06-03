"use client"

import Link from "next/link"
import styles from "./style.module.css"
import { Restaurant } from "@/data/Restaurant"
import Spacer from "@/components/ui/Spacer"
import React, { useState } from "react"
import { useAuth } from "@/model/auth/useAuth"
import { updateRestaurantArray } from "@/model/restaurant/updateRestaurantDocData"
import { useVotingStatus } from "@/model/votingStatus/useVotingStatus"
import UsersDialog from "../UsersDialog"
import Dialog from "@/components/ui/Dialog"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { GUIDE, STAY } from "@/data/User"
import { CheckIcon } from "@radix-ui/react-icons"

type Props = {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: Props) {
  const { user } = useAuth()
  const isVotingEnabled = useVotingStatus()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [attendanceRole, setAttendanceRole] = useState<string>(GUIDE)

  const onClickJoin = async () => {
    setIsDialogOpen(false)
    if (!user) {
      return
    }
    await updateAttendance()
  }

  const updateAttendance = async () => {
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

  const updateAttendanceAsGuide = async () => {
    if (!user) {
      return
    }
    if (attendanceRole === GUIDE) {
      if (restaurant.guidesIds.includes(user.uid)) {
        await updateRestaurantArray({
          docId: restaurant.id,
          key: "guidesIds",
          value: user.uid,
          method: "remove"
        })
      } else {
        await updateRestaurantArray({
          docId: restaurant.id,
          key: "guidesIds",
          value: user.uid,
          method: "union"
        })
      }
    }
    await updateAttendance()
  }

  return (
    <div className={styles.card}>
      <p className={styles.title}>{restaurant.name}</p>
      {restaurant.guidesIds.length && (
        <>
          <div style={{ display: "inline-block" }}>
            <div className={styles.positiveBadge}>
              <CheckIcon
                width={16}
                height={16}
              />
              <Spacer size={4} />
              <span>引率メンターあり</span>
            </div>
          </div>
          <Spacer size={12} />
        </>
      )}
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
          ) : user?.role === "mentor" ? (
            <Dialog.Root
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
            >
              <Dialog.Trigger>
                <button className={styles.joinButton}>行きたい</button>
              </Dialog.Trigger>
              <Dialog.Content title="引率しますか？">
                <form>
                  <RadioGroup.Root
                    className={styles.RadioGroupRoot}
                    defaultValue={GUIDE}
                    value={attendanceRole}
                    onValueChange={setAttendanceRole}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <RadioGroup.Item
                        className={styles.RadioGroupItem}
                        value={GUIDE}
                        id="r1"
                      >
                        <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                      </RadioGroup.Item>
                      <label
                        className={styles.RadioLabel}
                        htmlFor="r1"
                      >
                        引率する
                      </label>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <RadioGroup.Item
                        className={styles.RadioGroupItem}
                        value={STAY}
                        id="r2"
                      >
                        <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
                      </RadioGroup.Item>
                      <label
                        className={styles.RadioLabel}
                        htmlFor="r2"
                      >
                        他の人に行ってもらう
                      </label>
                    </div>
                  </RadioGroup.Root>
                </form>

                <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
                  <button
                    onClick={updateAttendanceAsGuide}
                    className={styles.button}
                  >
                    投票
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Root>
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
