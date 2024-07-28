export type OrderStyle = "takeout" | "mobile"
export const TAKEOUT: OrderStyle = "takeout"
export const MOBILE: OrderStyle = "mobile"

export type RestaurantVotingStatus = "open" | "closed"
export const OPEN: RestaurantVotingStatus = "open"
export const CLOSED: RestaurantVotingStatus = "closed"

export type Restaurant = {
  id: string
  name: string
  url: string
  attendantsIds: string[]
  pastAttendantsIds: string[]
  guidesIds: string[]
  orderStyle: OrderStyle
  isHidden: boolean
  memo: string
  votingStatus: RestaurantVotingStatus
  senderId: string
  createdAt: Date
}
