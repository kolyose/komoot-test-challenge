import camelcaseKeys from 'camelcase-keys'
/* import mockData from 'data.json' */

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

export const fetchTours = async (
  pageParam: string,
): Promise<{ rows: Array<TourData>; nextCursor?: string }> => {
  // TODO: take the URL from a config file
  const res = await fetch(
    'https://5cmf66e3ssmsx6mikgeh3mq4mu0fhzvp.lambda-url.eu-west-1.on.aws' +
      pageParam,
  )
  const json = await res.json()
  /* const json = mockData */
  const data: { tours: Array<TourData>; links: { next: string } } =
    camelcaseKeys(json, { deep: true })

  return {
    rows: data.tours,
    nextCursor: data.links.next,
  }
}
