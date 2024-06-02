import styles from "./style.module.css"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

type Props = {
  children: React.ReactNode
}

export default function ScrollArea({ children }: Props) {
  return (
    <ScrollAreaPrimitive.Root className={styles.root}>
      <ScrollAreaPrimitive.Viewport className={styles.viewport}>{children}</ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        className={styles.scrollbar}
        orientation="vertical"
      >
        <ScrollAreaPrimitive.Thumb className={styles.thumb} />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Scrollbar
        className={styles.scrollbar}
        orientation="horizontal"
      >
        <ScrollAreaPrimitive.Thumb className={styles.thumb} />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner className={styles.corner} />
    </ScrollAreaPrimitive.Root>
  )
}
