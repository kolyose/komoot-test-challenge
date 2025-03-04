import { useEffect, useState } from 'react'
import useFormattedUrlCache from '../hooks/useFormattedUrlCache'
import { TourData } from '../types/api'
import CardHeader from './common/CardHeader'
import CardMediaGallery from './common/CardMediaGallery'
import CardMediaMap from './common/CardMediaMap'
import CardMediaModeToggle, {
  MEDIA_MODE_TOGGLE_SIZE,
} from './common/CardMediaModeToggle'
import CardStats from './common/CardStats'

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

      <div className="grid h-192 w-full grid-cols-1 grid-rows-1 overflow-hidden">
        <div
          className={`grid-col-1 grid-row-1 h-192 w-full transition-opacity duration-300 ${
            isMapMode ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <CardMediaMap image={vectorMapImage} />
        </div>
        <div
          className={`grid-col-1 grid-row-1 h-192 w-full transition-opacity duration-300 ${
            isMapMode ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <CardMediaGallery images={images} />
        </div>
      </div>
      <CardMediaModeToggle
        src={isMapMode ? galleryPreviewSrc : vectorMapImagePreview.src}
        onToggle={() => setIsMapVisible(!isMapMode)}
      />
    </div>
  )
}

export default ActivityCard
