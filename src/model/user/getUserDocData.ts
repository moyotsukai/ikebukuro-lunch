import { User } from "@/data/User"
import { db } from "@/libs/firebase"
import { doc, getDoc } from "firebase/firestore"

export const getUserDocData = async (userId: string): Promise<User | null> => {
  const userRef = doc(db, "users", userId)
  const docSnapshot = await getDoc(userRef)
  if (docSnapshot.exists()) {
    const data = docSnapshot.data()
    return {
      uid: data.uid ?? docSnapshot.id,
      name: data.name ?? "",
      role: data.role ?? "member"
    }
  } else {
    return null
  }
}
