import { doc, setDoc } from "firebase/firestore"
import { db } from "@/libs/firebase"
import { User } from "@/data/User"

type Props = {
  userId: string
  user: User
}

export const setUserDocData = async ({ userId, user }: Props) => {
  const userRef = doc(db, "users", userId)
  await setDoc(userRef, user)
}
