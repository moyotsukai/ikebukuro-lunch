import { VotingStatus } from "@/data/VotingStatus"
import { db } from "@/libs/firebase"
import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"

export const useVotingStatus = () => {
  const [isVotingEnabled, setIsVotingEnabled] = useState<boolean>(false)
  const hasFetched = useRef<boolean>(false)

  useEffect(() => {
    if (hasFetched.current) {
      return
    }
    const docRef = doc(db, "votingStatus", "status")
    const unsubscribe = onSnapshot(docRef, (doc) => {
      hasFetched.current = true
      if (doc.exists()) {
        const data = doc.data()
        const votingStatus: VotingStatus = {
          isVotingEnabled: data.isVotingEnabled ?? false
        }
        setIsVotingEnabled(votingStatus.isVotingEnabled)
      }
    })

    return unsubscribe
  }, [])

  return isVotingEnabled
}
