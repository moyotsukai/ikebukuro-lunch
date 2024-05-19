"use client"

import { RecoilRoot } from "recoil"
import styles from "./style.module.css"
import SignInProvider from "@/components/features/SignInProvider"

type Props = {
  children: React.ReactNode
}

export default function AppContainer({ children }: Props) {
  return (
    <RecoilRoot>
      <SignInProvider>{children}</SignInProvider>
    </RecoilRoot>
  )
}
