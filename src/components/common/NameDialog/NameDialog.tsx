"use client"

import { setUserDocData } from "@/model/user/setUserDocData"
import styles from "./style.module.css"
import { useEffect, useState } from "react"
import Dialog from "@/components/ui/Dialog"
import Spacer from "@/components/ui/Spacer"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { Role } from "@/data/User"
import Avatar from "@/components/ui/Avatar"
import { useAuth } from "@/model/auth/useAuth"

export default function NameDialog() {
  const [name, setName] = useState<string>("")
  const { user, setUser } = useAuth()
  const isNameNotDetermined = user?.name === undefined || user?.name === ""
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(isNameNotDetermined)
  const [role, setRole] = useState<string>("member")

  useEffect(() => {
    setName(user?.name ?? "")
    if (!user?.role) {
      return
    }
    setRole(user?.role)
    setIsDialogOpen(user?.name === undefined || user?.name === "")
  }, [user])

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onChangeRole = (role: string) => {
    setRole(role)
  }

  const onClickSave = async () => {
    setIsDialogOpen(false)

    if (!user) {
      return
    }

    const userRole: Role = role === "mentor" ? "mentor" : "member"

    setUser((currentValue) => {
      if (!currentValue?.uid) {
        return currentValue
      } else {
        return {
          uid: currentValue.uid,
          name: name,
          role: userRole
        }
      }
    })

    await setUserDocData({ userId: user.uid, user: { uid: user.uid, name: name, role: userRole } })
  }

  return (
    <Dialog.Root
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <Dialog.Trigger>
        <button className={styles.PersonButton}>
          <Avatar
            size={32}
            user={user}
          />
        </button>
      </Dialog.Trigger>
      <Dialog.Content
        title="ニックネームを設定しよう！"
        onClose={(e) => {
          e.preventDefault()
        }}
      >
        <fieldset className={styles.Fieldset}>
          <label
            className={styles.Label}
            htmlFor="name"
          >
            ニックネーム
          </label>
          <input
            className={styles.Input}
            id="name"
            value={name}
            onChange={onChangeName}
          />
        </fieldset>

        <form>
          <label
            className={styles.Label}
            htmlFor="name"
          >
            ロール
          </label>
          <Spacer size={12} />
          <RadioGroup.Root
            className={styles.RadioGroupRoot}
            defaultValue="member"
            value={role}
            onValueChange={onChangeRole}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <RadioGroup.Item
                className={styles.RadioGroupItem}
                value="member"
                id="r1"
              >
                <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
              </RadioGroup.Item>
              <label
                className={styles.RadioLabel}
                htmlFor="r1"
              >
                メンバー
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <RadioGroup.Item
                className={styles.RadioGroupItem}
                value="mentor"
                id="r2"
              >
                <RadioGroup.Indicator className={styles.RadioGroupIndicator} />
              </RadioGroup.Item>
              <label
                className={styles.RadioLabel}
                htmlFor="r2"
              >
                メンター（管理者ロール）
              </label>
            </div>
          </RadioGroup.Root>
        </form>

        <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
          <button
            onClick={onClickSave}
            disabled={name === ""}
            className={name === "" ? styles.buttonDisabled : styles.button}
          >
            保存
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
