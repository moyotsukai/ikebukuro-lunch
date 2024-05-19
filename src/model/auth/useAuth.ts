import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useRecoilState } from "recoil"
import { userState } from "../../states/atoms"
import { auth } from "@/libs/firebase"

export const useAuth = () => {
  const [user, setUser] = useRecoilState(userState)
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setUser({ uid: user.uid, name: "" })
          console.log("useAuth, uid: ", user.uid)
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
