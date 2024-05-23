import { VotingStatus } from "@/data/VotingStatus"
import { db } from "@/libs/firebase"
import { doc, setDoc } from "firebase/firestore"

type Props = {
  votingStatus: VotingStatus
}

export const setVotingStatus = async ({ votingStatus }: Props) => {
  const docRef = doc(db, "votingStatus", "status")
  await setDoc(docRef, votingStatus)
}
