import { Restaurant } from "@/data/Restaurant"
import { db } from "@/libs/firebase"
import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    const collectionRef = collection(db, "restaurants")
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data()
          const newRestaurant: Restaurant = {
            name: data.name ?? "",
            url: data.url ?? "",
            attendantsIds: data.attendantsIds ?? [],
            pastAttendantsIds: data.pastAttendantsIds ?? [],
            senderId: data.senderId ?? "",
            createdAt: data.createdAt ?? new Date()
          }
          setRestaurants((currentValue) => [newRestaurant, ...currentValue])
        }
      })
    })

    return unsubscribe
  }, [])

  return restaurants
}
