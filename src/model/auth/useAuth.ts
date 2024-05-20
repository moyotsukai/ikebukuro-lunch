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
          //Signed in
          const userData = await getUserDocData(user.uid)
          if (userData) {
            setUser(userData)
          } else {
            setUser({
              uid: user.uid,
              name: "",
              role: "member"
            })
          }
        } else {
          //Not signed in
          setUser(undefined)
        }
      } catch (error) {
        //Most probably a connection error
        setUser(null)
      } finally {
        setIsLoadingUser(false)
      }
    })

    return unsubscribe
  }, [setUser])

  return { user, isLoadingUser }
}
