import { auth } from "@/libs/firebase"
import { signInAnonymously } from "firebase/auth"

export const signIn = async () => {
  try {
    await signInAnonymously(auth)
  } catch (error) {
    console.log(error)
  }
}

export const signOut = async () => {
  try {
    await auth.signOut()
  } catch (error) {
    console.log(error)
  }
}
