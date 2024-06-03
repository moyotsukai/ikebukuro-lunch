import { Restaurant } from "@/data/Restaurant"

export const restaurantFromFirestore = ({ data, id }: { data: any; id: string }): Restaurant => {
  return {
    id: data.id ?? id,
    name: data.name ?? "",
    url: data.url ?? "",
    attendantsIds: data.attendantsIds ?? [],
    pastAttendantsIds: data.pastAttendantsIds ?? [],
    guidesIds: data.guidesIds ?? [],
    senderId: data.senderId ?? "",
    createdAt: data.createdAt ?? new Date()
  }
}
