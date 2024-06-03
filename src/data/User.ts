export type Role = "member" | "mentor"
export const MEMBER: Role = "member"
export const MENTOR: Role = "mentor"

export type User = {
  uid: string
  name: string
  role: Role
}

export type AttendanceRole = "guide" | "stay"
export const GUIDE: AttendanceRole = "guide"
export const STAY: AttendanceRole = "stay"
