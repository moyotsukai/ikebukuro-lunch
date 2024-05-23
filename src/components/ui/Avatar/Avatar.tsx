import { PersonIcon } from "@radix-ui/react-icons"
import styles from "./style.module.css"
import { User } from "@/data/User"

type Props = {
  size: number
  user?: User | undefined | null
}

export default function Avatar({ size, user }: Props) {
  const userData: User = user ?? {
    uid: "",
    name: "",
    role: "member"
  }

  return (
    <PersonIcon
      width={size}
      height={size}
      style={{
        backgroundColor: userData.role === "mentor" ? "#bb00ff" : "#f7be00",
        borderRadius: size / 2
      }}
      className={styles.personIcon}
    />
  )
}
