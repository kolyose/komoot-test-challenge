import { TourData } from '../types/api'
import CardHeader from './CardHeader'
import CardMediaGallery from './CardMediaGallery'
import CardStats from './CardStats'

function ActivityCard(props: TourData) {
  const {
    name,
    displayName,
    date,
    creator: {
      avatar: { src },
    },
    timeInMotion,
    elevationDown,
    elevationUp,
    distance,
    images,
    vectorMapImage,
    vectorMapImagePreview,
  } = props

  return (
    <div className="flex h-full w-full flex-col gap-2 rounded-xs bg-white p-4 shadow-md">
      <CardHeader title={name} src={src} name={displayName} date={date} />

      <CardStats
        duration={timeInMotion}
        distance={distance}
        elevationDown={elevationDown}
        elevationUp={elevationUp}
      />
      <CardMediaGallery images={images} />
    </div>
  )
}

export default ActivityCard
