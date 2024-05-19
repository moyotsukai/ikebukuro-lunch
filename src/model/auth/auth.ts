import { auth } from "@/libs/firebase"
import { signInAnonymously } from "firebase/auth"

export const signIn = async () => {
  try {
    await signInAnonymously(auth)
    console.log("Signed in")
  } catch (error) {
    console.log(error)
  }
}

export const signOut = async () => {
  try {
    await auth.signOut()
    console.log("Signed out")
  } catch (error) {
    console.log(error)
  }
}
