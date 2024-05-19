import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useRecoilState } from "recoil"
import { userState } from "../../states/atoms"
import { auth } from "@/libs/firebase"
import { getUserDocData } from "../user/getUserDocData"

export const useAuth = () => {
  const [user, setUser] = useRecoilState(userState)
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userData = await getUserDocData(user.uid)
          setUser(userData)
          console.log("useAuth, uid: ", userData)
        } else {
          setUser(undefined)
          console.log("useAuth, Not signed in")
        }
      } catch (error) {
        //Most probably a connection error
        setUser(null)
        console.log("useAuth, error", error)
      } finally {
        setIsLoadingUser(false)
      }
    })

    return () => unsubscribe()
  }, [setUser])

  return { user, isLoadingUser }
}
