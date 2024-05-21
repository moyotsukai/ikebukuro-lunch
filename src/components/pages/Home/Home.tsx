"use client"

import styles from "./style.module.css"
import NewRestaurantDialog from "@/components/features/NewRestaurantDialog"
import RestaurantCard from "@/components/features/RestaurantCard"
import Spacer from "@/components/ui/Spacer"
import { useRestaurants } from "@/model/restaurant/useRestaurants"

export default function Home() {
  const restaurants = useRestaurants()

  return (
    <div>
      <Spacer size={30} />
      <div className={styles.top}>
        <h1>お店一覧</h1>
        <NewRestaurantDialog />
      </div>
      <div>
        {restaurants.map((restaurant, index) => (
          <>
            <Spacer size={10} />
            <RestaurantCard
              restaurant={restaurant}
              key={index}
            />
          </>
        ))}
      </div>
    </div>
  )
}
