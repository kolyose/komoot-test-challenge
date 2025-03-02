import { useEffect, useState } from 'react'
import useFormattedUrlCache from '../hooks/useFormattedUrlCache'
import { TourData } from '../types/api'
import CardHeader from './CardHeader'
import CardMediaGallery from './CardMediaGallery'
import CardMediaMap from './CardMediaMap'
import CardMediaModeToggle, {
  MEDIA_MODE_TOGGLE_SIZE,
} from './CardMediaModeToggle'
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
  const [isMapMode, setIsMapVisible] = useState(false)
  const [[galleryPreviewSrc], formatAndCacheUrls] = useFormattedUrlCache()

  useEffect(() => {
    formatAndCacheUrls([
      {
        src: images[0].src,
        width: MEDIA_MODE_TOGGLE_SIZE,
        height: MEDIA_MODE_TOGGLE_SIZE,
      },
    ])
  }, [])

  return (
    <div className="flex h-full w-full flex-col gap-2 rounded-xs bg-white p-4 shadow-md">
      <CardHeader title={name} src={src} name={displayName} date={date} />
      <CardStats
        duration={timeInMotion}
        distance={distance}
        elevationDown={elevationDown}
        elevationUp={elevationUp}
      />
      <CardMediaModeToggle
        src={isMapMode ? galleryPreviewSrc : vectorMapImagePreview.src}
        onToggle={() => setIsMapVisible(!isMapMode)}
      />
      {isMapMode ? (
        <CardMediaMap image={vectorMapImage} />
      ) : (
        <CardMediaGallery images={images} />
      )}
    </div>
  )
}

export default ActivityCard
