import { Restaurant } from "@/data/Restaurant"
import { db } from "@/libs/firebase"
import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../auth/useAuth"

export const useRestaurants = () => {
  const { user } = useAuth()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const hasFetched = useRef<boolean>(false)

  useEffect(() => {
    if (hasFetched.current) {
      return
    }
    if (!user) {
      return
    }
    const collectionRef = collection(db, "restaurants")
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      hasFetched.current = true
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data()
          const newRestaurant: Restaurant = {
            id: data.id ?? change.doc.id,
            name: data.name ?? "",
            url: data.url ?? "",
            attendantsIds: data.attendantsIds ?? [],
            pastAttendantsIds: data.pastAttendantsIds ?? [],
            senderId: data.senderId ?? "",
            createdAt: data.createdAt ?? new Date()
          }
          setRestaurants((currentValue) => [newRestaurant, ...currentValue])
        }
        if (change.type === "modified") {
          const data = change.doc.data()
          const updatedRestaurant: Restaurant = {
            id: data.id ?? change.doc.id,
            name: data.name ?? "",
            url: data.url ?? "",
            attendantsIds: data.attendantsIds ?? [],
            pastAttendantsIds: data.pastAttendantsIds ?? [],
            senderId: data.senderId ?? "",
            createdAt: data.createdAt ?? new Date()
          }
          setRestaurants((currentValue) => {
            const newValue = currentValue.map((restaurant) => {
              if (restaurant.id === updatedRestaurant.id) {
                return updatedRestaurant
              } else {
                return restaurant
              }
            })
            return newValue
          })
        }
      })
    })

    return unsubscribe
  }, [user])

  return restaurants
}
