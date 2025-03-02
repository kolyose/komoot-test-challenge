export type TourStatus = 'public' | 'private'

export interface VectorMapImage {
  src: string
  attribution: string
}

export interface TourCreator {
  username: string
  avatar: {
    src: string
    templated: boolean
  }
}

export interface TourData {
  id: string
  name: string
  status: string /* TourStatus; */
  date: string
  distance: number
  timeInMotion: number
  elevationUp: number
  elevationDown: number
  creator: TourCreator
  displayName: string
  isPremium: string /* boolean; */
  images: Array<{ id: number /* string */; src: string; templated: boolean }>
  vectorMapImage: VectorMapImage
  vectorMapImagePreview: VectorMapImage
}
