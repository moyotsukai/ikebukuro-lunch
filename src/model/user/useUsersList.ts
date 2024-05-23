import { User } from "@/data/User"
import { db } from "@/libs/firebase"
import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"

export const useUsersList = () => {
  const [usersList, setUsersList] = useState<User[]>([])

  useEffect(() => {
    const collectionRef = collection(db, "users")
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data()
          const newUser: User = {
            uid: data.uid ?? change.doc.id,
            name: data.name ?? "",
            role: data.role ?? "member"
          }
          setUsersList((currentValue) => [newUser, ...currentValue])
        }
      })
    })

    return unsubscribe
  }, [])

  return usersList
}
