import { useEffect } from 'react'
import useFormattedUrl from '../../../hooks/useFormattedUrlCache'
import { CardMediaImagesProps } from './CardMediaGallery'

function CardMediaSingleImage({
  images,
  width,
  height,
  onSelect,
}: CardMediaImagesProps) {
  const [[url], formatUrls] = useFormattedUrl()

  useEffect(() => {
    if (width) {
      formatUrls([{ src: images[0].src, width, height }])
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
