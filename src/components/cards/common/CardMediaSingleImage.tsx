import { useEffect } from 'react'
import useFormattedUrl from '../../../hooks/useFormattedUrl'
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
    <button
      data-testid="card-media-single-image"
      aria-label="Open adventure's media gallery"
      className="flex cursor-pointer bg-gray-100 transition-transform duration-300 ease-in-out hover:scale-99"
      onClick={() => onSelect(0)}
    >
      <img
        className="h-full w-full rounded-xs object-cover"
        src={url}
        alt="Adventure's gallery image preview"
      />
    </button>
  )
}

export default CardMediaSingleImage
