import styles from "./style.module.css"

type Props = {
  size: number
  isInline?: boolean
}

export default function Spacer({ size, isInline = false }: Props) {
  if (isInline) {
    return (
      <div
        className={styles.spacerInline}
        style={{ width: `${size}px` }}
      />
    )
  } else {
    return (
      <div
        className={styles.spacer}
        style={{ height: `${size}px` }}
      />
    )
  }
}
