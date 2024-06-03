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
import { CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons"
import RestaurantMenu from "../RestaurantMenu"

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
    if (user.role === "mentor") {
      await updateAttendanceAsGuide()
    } else {
      await updateAttendance()
    }
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

    if (restaurant.guidesIds.includes(user.uid)) {
      await updateRestaurantArray({
        docId: restaurant.id,
        key: "guidesIds",
        value: user.uid,
        method: "remove"
      })
    } else {
      if (attendanceRole === GUIDE) {
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
      <div className={styles.titleContainer}>
        <p className={styles.title}>{restaurant.name}</p>
        <RestaurantMenu restaurant={restaurant} />
      </div>

      {restaurant.guidesIds.length !== 0 && (
        <>
          <Spacer
            size={4}
            isInline={true}
          />
          <div style={{ display: "inline-block" }}>
            <div className={styles.positiveBadge}>
              <CheckIcon
                width={16}
                height={16}
              />
              <Spacer size={6} />
              <span>引率メンター</span>
            </div>
          </div>
        </>
      )}

      {restaurant.orderStyle === "mobile" && (
        <>
          <Spacer
            size={4}
            isInline={true}
          />
          <div style={{ display: "inline-block" }}>
            <div className={styles.alartBadge}>
              <ExclamationTriangleIcon
                width={16}
                height={16}
              />
              <Spacer size={6} />
              <span>モバイルオーダー</span>
            </div>
          </div>
        </>
      )}

      <Spacer size={10} />
      <div>
        <Link
          href={restaurant.url}
          className={styles.link}
        >
          {restaurant.url}
        </Link>
      </div>

      {restaurant.memo && (
        <>
          <Spacer size={12} />
          <div>
            <p className={styles.supportingText}>{restaurant.memo}</p>
          </div>
        </>
      )}

      {restaurant.pastAttendantsIds.length !== 0 && (
        <>
          <Spacer size={10} />
          <div>
            <p
              className={styles.supportingText}
            >{`前回までに${restaurant.pastAttendantsIds.length}人が買いに行きました`}</p>
          </div>
        </>
      )}

      <Spacer size={15} />
      <div className={styles.buttonContainer}>
        {isVotingEnabled && restaurant.votingStatus === "open" ? (
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
        <UsersDialog
          title="参加者"
          userIds={restaurant.attendantsIds}
        />
      </div>
    </div>
  )
}
