import { User } from "@/data/User"
import { db } from "@/libs/firebase"
import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../auth/useAuth"

export const useUsersList = () => {
  const { user } = useAuth()
  const [usersList, setUsersList] = useState<User[]>([])
  const hasFetched = useRef<boolean>(false)

  useEffect(() => {
    if (hasFetched.current) {
      return
    }
    if (!user) {
      return
    }
    const collectionRef = collection(db, "users")
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      hasFetched.current = true
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
  }, [user])

  return usersList
}
