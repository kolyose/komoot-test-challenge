import { useEffect, useState } from 'react'
import { TourData } from '../../api'
import useFormattedUrl from '../../hooks/useFormattedUrl'
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
  const [[galleryPreviewSrc], formatUrls] = useFormattedUrl()

  useEffect(() => {
    formatUrls([
      {
        src: images[0].src,
        width: MEDIA_MODE_TOGGLE_SIZE,
        height: MEDIA_MODE_TOGGLE_SIZE,
      },
    ])
  }, [])

  return (
    <div className="flex h-full w-full flex-col gap-2 rounded-xs bg-white p-2 shadow-md sm:p-4">
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
      {/* TODO:
        Try animations (absolute/grid) with 'contents' attribute:
        <div className="contents">
          {showFirst ? <Container1 /> : <Container2 />}
        </div>
       */}
      {isMapMode ? (
        <CardMediaMap image={vectorMapImage} />
      ) : (
        <CardMediaGallery images={images} />
      )}
    </div>
  )
}

export default ActivityCard
