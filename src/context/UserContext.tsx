import { User } from "@/data/User"
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

type UserStateType = User | null | undefined

const defaultUserValue: UserStateType = undefined

const UserValueContext = createContext<UserStateType>(defaultUserValue)

const UserDispatchContext = createContext<Dispatch<SetStateAction<UserStateType>>>(() => undefined)

type Props = {
  children: React.ReactNode
}

export function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<UserStateType>(defaultUserValue)
  return (
    <UserValueContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>{children}</UserDispatchContext.Provider>
    </UserValueContext.Provider>
  )
}

export const useUserValue = () => {
  return useContext(UserValueContext)
}

export const useSetUser = () => {
  return useContext(UserDispatchContext)
}
