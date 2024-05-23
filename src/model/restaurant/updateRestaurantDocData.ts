import { Restaurant } from "@/data/Restaurant"
import { db } from "@/libs/firebase"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"

type UpdateProps = {
  docId: string
  restaurant: Partial<Restaurant>
}

export const updateRestaurant = async ({ docId, restaurant }: UpdateProps) => {
  const docRef = doc(db, "restaurants", docId)
  await updateDoc(docRef, restaurant)
}

type UpdateArrayProps = {
  docId: string
  key: keyof Restaurant
  value: string
  method: "union" | "remove"
}

export const updateRestaurantArray = async ({ docId, key, value, method }: UpdateArrayProps) => {
  const docRef = doc(db, "restaurants", docId)
  if (method === "union") {
    await updateDoc(docRef, { [key]: arrayUnion(value) })
  } else {
    await updateDoc(docRef, { [key]: arrayRemove(value) })
  }
}
