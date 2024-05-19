import React, { useEffect } from "react"
import { useAuth } from "../../model/auth/useAuth"
import { signIn } from "../../model/auth/auth"
import Message from "../ui/Message"

type Props = {
  isLoading?: boolean
  children: React.ReactNode
}

export default function SignInProvider({ isLoading, children }: Props) {
  const { user, isLoadingUser } = useAuth()

  useEffect(() => {
    if (!user) {
      signIn()
    }
  }, [user])

  if (isLoadingUser || (isLoading ?? false)) {
    return <Message isLoading={true}>読み込み中...</Message>
  }

  if (user === null) {
    return <Message>接続されていません</Message>
  }

  return <React.Fragment>{children}</React.Fragment>
}
