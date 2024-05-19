import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "@/libs/firebase"
import { Restaurant } from "@/data/Restaurant"

type Props = {
  restaurant: Restaurant
}

export const createRestaurantDocData = async ({ restaurant }: Props): Promise<string> => {
  const newDocRef = doc(collection(db, "restaurants"))
  await setDoc(newDocRef, restaurant)

  return newDocRef.id
}
