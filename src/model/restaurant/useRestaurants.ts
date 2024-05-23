import { Restaurant } from "@/data/Restaurant"
import { db } from "@/libs/firebase"
import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAuth } from "../auth/useAuth"

export const useRestaurants = () => {
  const user = useAuth()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    const collectionRef = collection(db, "restaurants")
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const restaurants: Restaurant[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        const restaurantData: Restaurant = {
          id: data.id ?? doc.id,
          name: data.name ?? "",
          url: data.url ?? "",
          attendantsIds: data.attendantsIds ?? [],
          pastAttendantsIds: data.pastAttendantsIds ?? [],
          senderId: data.senderId ?? "",
          createdAt: data.createdAt ?? new Date()
        }
        restaurants.push(restaurantData)
      })
      setRestaurants(restaurants)
    })

    return unsubscribe
  }, [user])

  return restaurants
}
