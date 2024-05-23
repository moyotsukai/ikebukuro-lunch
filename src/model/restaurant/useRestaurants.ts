import { Restaurant } from "@/data/Restaurant"
import { db } from "@/libs/firebase"
import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const hasFetched = useRef<boolean>(false)

  useEffect(() => {
    if (hasFetched.current) {
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
          console.log("restaurant added")
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
          console.log("restaurant modified")
        }
      })
    })

    return unsubscribe
  }, [])

  return restaurants
}
