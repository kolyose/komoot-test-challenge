import { useEffect } from 'react'
import useFormattedUrlCache from '../hooks/useFormattedUrlCache'
import { CardMediaImagesProps } from './CardMediaGallery'

const FIRST_COLUMN_SCALE_FACTOR = 0.6
const SECOND_COLUMN_SCALE_FACTOR = 1 - FIRST_COLUMN_SCALE_FACTOR
const GAP = 4

const calcTileSizeScaleFactors = (
  index: number,
): { width: number; height: number } =>
  index === 0
    ? { width: FIRST_COLUMN_SCALE_FACTOR, height: 1 }
    : { width: SECOND_COLUMN_SCALE_FACTOR, height: 0.5 }

function CardMediaImageGrid({ images, width, height }: CardMediaImagesProps) {
  const [urls, formatAndCacheUrls] = useFormattedUrlCache()

  useEffect(() => {
    if (width) {
      const urlFormatData = images.map(({ src }, index) => {
        const scaleFactor = calcTileSizeScaleFactors(index)
        return {
          src,
          width: Math.round(width * scaleFactor.width - GAP),
          height: Math.round(
            height * scaleFactor.height - GAP * Math.ceil(index / 2),
          ),
        }
      })
      formatAndCacheUrls(urlFormatData)
    }
  }, [width])

  return (
    <>
      { /* prettier-ignore */ }
      <div      
        className={`grid grid-flow-col gap-2 overflow-hidden
          grid-cols-[calc(100% * ${FIRST_COLUMN_SCALE_FACTOR})_calc(100% * ${SECOND_COLUMN_SCALE_FACTOR})] 
          grid-rows-[1fr 1fr]`
        }
      >
        {images.map(({ id }, index) => {
          return (
            <div key={id} className={`${index === 0 ? 'row-span-2' : ''}`}>
              <img
                className="rounded-xs object-cover"
                src={urls[index]}
                alt="Image"
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default CardMediaImageGrid
