import { Cross2Icon } from "@radix-ui/react-icons"
import styles from "./style.module.css"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Dispatch, MouseEventHandler, SetStateAction } from "react"
import Spacer from "../Spacer"
import ScrollArea from "../ScrollArea"

type RootProps = {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}
export function Root({ open, onOpenChange, children }: RootProps) {
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      {children}
    </DialogPrimitive.Root>
  )
}

type TriggerProps = {
  children: React.ReactNode
}
export function Trigger({ children }: TriggerProps) {
  return <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
}

type ContentProps = {
  title: string
  onClose?: (event: any) => void
  children: React.ReactNode
}
export function Content({ title, onClose, children }: ContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.dialogOverlay}>
        <DialogPrimitive.Content
          onEscapeKeyDown={onClose}
          onPointerDownOutside={onClose}
          onInteractOutside={onClose}
          className={styles.dialogContent}
        >
          <div className={styles.contentInside}>
            <DialogPrimitive.Title className={styles.dialogTitle}>{title}</DialogPrimitive.Title>
            <Spacer size={30} />
            {children}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Overlay>
    </DialogPrimitive.Portal>
  )
}

type CloseProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>
}
export function Close({ onClick }: CloseProps) {
  return (
    <DialogPrimitive.Close asChild>
      <button
        className={styles.closeButton}
        aria-label="Close"
        onClick={onClick}
      >
        <Cross2Icon />
      </button>
    </DialogPrimitive.Close>
  )
}
