import { Restaurant } from "@/data/Restaurant"

export const restaurantFromFirestore = ({ data, id }: { data: any; id: string }): Restaurant => {
  return {
    id: data.id ?? id,
    name: data.name ?? "",
    url: data.url ?? "",
    attendantsIds: data.attendantsIds ?? [],
    pastAttendantsIds: data.pastAttendantsIds ?? [],
    guidesIds: data.guidesIds ?? [],
    orderStyle: data.orderStyle ?? "takeout",
    isHidden: data.isHidden ?? false,
    memo: data.memo ?? "",
    votingStatus: data.votingStatus ?? "open",
    senderId: data.senderId ?? "",
    createdAt: data.createdAt ?? new Date()
  }
}

export const newRestaurantToFirestore = (data: Partial<Restaurant>): Omit<Restaurant, "id"> => {
  return {
    name: data.name ?? "",
    url: data.url ?? "",
    attendantsIds: data.attendantsIds ?? [],
    pastAttendantsIds: data.pastAttendantsIds ?? [],
    guidesIds: data.guidesIds ?? [],
    orderStyle: data.orderStyle ?? "takeout",
    memo: data.memo ?? "",
    isHidden: data.isHidden ?? false,
    votingStatus: data.votingStatus ?? "open",
    senderId: data.senderId ?? "",
    createdAt: data.createdAt ?? new Date()
  }
}
