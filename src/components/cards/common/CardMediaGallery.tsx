import useElementSize from '../../../hooks/useElementSize'
import useMediaQuery from '../../../hooks/useMediaQuery'
import { TourData } from '../../../types/api'
import CardMediaImageGrid from './CardMediaImageGrid'
import CardMediaSingleImage from './CardMediaSingleImage'

interface CardMediaGalleryProps {
  images: TourData['images']
}

export interface CardMediaImagesProps extends CardMediaGalleryProps {
  width: number
  height: number
}

function CardMediaGallery({ images }: CardMediaGalleryProps) {
  const { ref, size } = useElementSize()
  const isLargeScreen = useMediaQuery('(min-width: 768px)')
  const isGridMode = isLargeScreen && images.length > 2

  return (
    <section ref={ref} className="h-192 w-full overflow-hidden">
      {isGridMode ? (
        <CardMediaImageGrid
          images={images.slice(0, 3)}
          width={size.width}
          height={size.height}
        />
      ) : (
        <CardMediaSingleImage
          images={images}
          width={size.width}
          height={size.height}
        />
      )}
    </section>
  )
}

export default CardMediaGallery
