export type Role = "member" | "mentor"

export type User = {
  uid: string
  name: string
  role: Role
}
