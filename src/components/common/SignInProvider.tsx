import React, { useEffect, useRef, useState } from "react"
import { signIn } from "../../model/auth/auth"
import Message from "../ui/Message"
import { useSetUser, useUserValue } from "@/context/UserContext"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/libs/firebase"
import { getUserDocData } from "@/model/user/getUserDocData"

type Props = {
  isLoading?: boolean
  children: React.ReactNode
}

export default function SignInProvider({ isLoading, children }: Props) {
  const [user, setUser] = [useUserValue(), useSetUser()]
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)
  const hasFetched = useRef<boolean>(false)

  useEffect(() => {
    if (!user) {
      signIn()
    }
  }, [user])

  useEffect(() => {
    if (hasFetched.current) {
      return
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      hasFetched.current = true
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
  }, [])

  if (isLoadingUser || (isLoading ?? false)) {
    return <Message isLoading={true}>読み込み中...</Message>
  }

  if (user === null) {
    return <Message>接続エラー</Message>
  }

  return <React.Fragment>{children}</React.Fragment>
}
