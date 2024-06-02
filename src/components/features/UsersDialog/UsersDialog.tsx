import React, { useState } from "react"
import styles from "./style.module.css"
import Dialog from "@/components/ui/Dialog"
import Avatar from "@/components/ui/Avatar"
import Spacer from "@/components/ui/Spacer"
import { useUsersList } from "@/model/user/useUsersList"

type Props = {
  userIds: string[]
}

export default function UsersDialog({ userIds }: Props) {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const usersList = useUsersList()
  const MAX_USERS_LENGTH = 6
  const topUsers = userIds.length >= MAX_USERS_LENGTH ? userIds.slice(0, MAX_USERS_LENGTH - 1) : userIds

  return (
    <Dialog.Root
      open={isOpenDialog}
      onOpenChange={setIsOpenDialog}
    >
      <Dialog.Trigger>
        <div className={styles.attendantsButton}>
          {topUsers.map((topUserId, index) => (
            <Avatar
              size={20}
              user={usersList.find((user) => user.uid === topUserId)}
              key={index}
            />
          ))}
          {userIds.length >= MAX_USERS_LENGTH && <span>...</span>}
          <Spacer
            size={8}
            isInline={true}
          />
          <span>{userIds.length}人</span>
        </div>
      </Dialog.Trigger>
      <Dialog.Content title="参加者">
        <div>
          <p>{userIds.length}人</p>
          <Spacer size={6} />
          {userIds.map((attendantId, index) => (
            <React.Fragment key={index}>
              <Spacer size={12} />
              <div className={styles.personNameRow}>
                <Avatar
                  size={24}
                  user={usersList.find((user) => user.uid === attendantId)}
                />
                <Spacer
                  size={8}
                  isInline={true}
                />
                {usersList.find((user) => user.uid === attendantId)?.name ?? ""}
              </div>
            </React.Fragment>
          ))}
        </div>
        <Dialog.Close />
      </Dialog.Content>
    </Dialog.Root>
  )
}
