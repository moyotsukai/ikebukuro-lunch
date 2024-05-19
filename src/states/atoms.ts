import { User } from "@/data/User"
import { atom } from "recoil"

export const userState = atom<User | undefined | null>({
  key: "userState",
  default: undefined
})
