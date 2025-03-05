import { useEffect } from 'react'
import useFormattedUrlCache from '../../../hooks/useFormattedUrlCache'
import { CardMediaImagesProps } from './CardMediaGallery'

function CardMediaSingleImage({
  images,
  width,
  height,
  onSelect,
}: CardMediaImagesProps) {
  const [[url], formatAndCacheUrls] = useFormattedUrlCache()

  useEffect(() => {
    if (width) {
      formatAndCacheUrls([{ src: images[0].src, width, height }])
    }
  }, [width])

  return (
    <div
      className="flex"
      onClick={(e) => {
        e.stopPropagation()
        onSelect(0)
      }}
    >
      <img
        className="h-full w-full rounded-xs object-cover"
        src={url}
        alt="Image"
      />
    </div>
  )
}

export default CardMediaSingleImage
