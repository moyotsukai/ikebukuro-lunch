export type OrderStyle = "takeout" | "mobile"
export const TAKEOUT: OrderStyle = "takeout"
export const MOBILE: OrderStyle = "mobile"

export type Restaurant = {
  id: string
  name: string
  url: string
  attendantsIds: string[]
  pastAttendantsIds: string[]
  guidesIds: string[]
  orderStyle: OrderStyle
  comment: string[]
  senderId: string
  createdAt: Date
}
