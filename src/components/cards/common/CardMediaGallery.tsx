import { useState } from 'react'
import { TourData } from '../../../api'
import useElementSize from '../../../hooks/useElementSize'
import useMediaQuery from '../../../hooks/useMediaQuery'
import ImageViewer from '../../ImageViewer'
import CardMediaImageGrid from './CardMediaImageGrid'
import CardMediaSingleImage from './CardMediaSingleImage'

interface CardMediaGalleryProps {
  images: TourData['images']
}

export interface CardMediaImagesProps extends CardMediaGalleryProps {
  width: number
  height: number
  onSelect: (index: number) => void
}

function CardMediaGallery({ images }: CardMediaGalleryProps) {
  const { ref, size } = useElementSize()
  const isLargeScreen = useMediaQuery('(min-width: 768px)')
  const [selectedImageIndex, setSelectedImageIndex] = useState<
    number | undefined
  >(undefined)
  const isGridMode = isLargeScreen && images.length > 2

  return (
    <section ref={ref} className="h-192 w-full">
      <ImageViewer
        images={images}
        selectedIndex={selectedImageIndex}
        setSelectedIndex={setSelectedImageIndex}
      />
      {isGridMode ? (
        <CardMediaImageGrid
          images={images.slice(0, 3)}
          width={size.width}
          height={size.height}
          onSelect={setSelectedImageIndex}
        />
      ) : (
        <CardMediaSingleImage
          images={images}
          width={size.width}
          height={size.height}
          onSelect={setSelectedImageIndex}
        />
      )}
    </section>
  )
}

export default CardMediaGallery
