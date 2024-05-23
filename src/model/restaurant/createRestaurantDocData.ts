import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "@/libs/firebase"
import { Restaurant } from "@/data/Restaurant"

type Props = {
  restaurant: Omit<Restaurant, "id">
}

export const createRestaurantDocData = async ({ restaurant }: Props): Promise<string> => {
  const newDocRef = doc(collection(db, "restaurants"))
  const newRestaurantData: Restaurant = { ...restaurant, id: newDocRef.id }
  await setDoc(newDocRef, newRestaurantData)

  return newDocRef.id
}
