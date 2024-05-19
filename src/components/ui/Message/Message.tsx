import styles from "./style.module.css"

type Props = {
  isLoading?: boolean
  children?: React.ReactNode
}

export default function Message({ isLoading = false, children }: Props) {
  if (isLoading) {
    return (
      <div className={styles.loading}>
        {/* <LoadingCircle /> */}
        <span className={styles.text}>{children}</span>
      </div>
    )
  } else {
    return (
      <div className={styles.message}>
        <span className={styles.text}>{children}</span>
      </div>
    )
  }
}
