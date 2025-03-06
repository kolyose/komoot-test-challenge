import { injectSizeIntoUrl } from '../../../hooks/useFormattedUrl'
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

function CardMediaImageGrid({
  images,
  width,
  height,
  onSelect,
}: CardMediaImagesProps) {
  if (!width) return null

  return (
    <>
      { /* prettier-ignore */ }
      <div      
        className={`grid grid-flow-col gap-2
          grid-cols-[calc(100% * ${FIRST_COLUMN_SCALE_FACTOR})_calc(100% * ${SECOND_COLUMN_SCALE_FACTOR})] 
          grid-rows-[1fr 1fr]`
        }
      >
        {images.map(({ id, src }, index) => {
          const scaleFactor = calcTileSizeScaleFactors(index)
          const w = width * scaleFactor.width - GAP
          const h = height * scaleFactor.height - GAP * Math.ceil(index / 2)
          const url = injectSizeIntoUrl(src, w, h)

          return (
            <button
              data-testid={`card-media-grid-image-${index}`}
              aria-label="Open adventure's media gallery"
              key={id}
              className={`${index === 0 ? 'row-span-2' : ''} cursor-pointer transition-transform duration-300 ease-in-out hover:scale-99 bg-gray-100`}
              style={{ width: `${w}px`, height: `${h}px`}}
              onClick={() => onSelect(index)}
            >
              <img
                className="rounded-xs object-cover"
                src={url}
                alt="Adventure's media gallery thumbnail"
              />
            </button>
          )
        })}
      </div>
    </>
  )
}

export default CardMediaImageGrid
