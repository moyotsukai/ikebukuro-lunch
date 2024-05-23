"use client"

import styles from "./style.module.css"
import NewRestaurantDialog from "@/components/features/NewRestaurantDialog"
import RestaurantCard from "@/components/features/RestaurantCard"
import Spacer from "@/components/ui/Spacer"
import { useRestaurants } from "@/model/restaurant/useRestaurants"
import { useUsersList } from "@/model/user/useUsersList"
import React from "react"

export default function Home() {
  const restaurants = useRestaurants()
  const usersList = useUsersList()

  return (
    <div>
      <Spacer size={30} />
      <div className={styles.top}>
        <h1>お店一覧</h1>
        <NewRestaurantDialog />
      </div>
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
