import { ComponentProps, forwardRef } from "react"
import styles from "./style.module.css"

type Props = ComponentProps<"button"> & {
  disabled?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, Props>(({ disabled, children }, ref) => {
  return (
    <button
      className={disabled ? styles.buttonDisabled : styles.button}
      ref={ref}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button
