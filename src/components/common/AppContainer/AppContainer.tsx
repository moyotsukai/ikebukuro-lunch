"use client"

import { RecoilRoot, useRecoilValue } from "recoil"
import styles from "./style.module.css"
import SignInProvider from "@/components/features/SignInProvider"
import NameDialog from "../NamePopover/NameDialog"

type Props = {
  children: React.ReactNode
}

export default function AppContainer({ children }: Props) {
  return (
    <RecoilRoot>
      <SignInProvider>
        <header>
          <NameDialog />
        </header>
        {children}
      </SignInProvider>
    </RecoilRoot>
  )
}
