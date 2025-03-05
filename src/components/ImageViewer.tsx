import throttle from 'lodash.throttle'
import { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { TourData } from '../api'
import useFormattedUrl from '../hooks/useFormattedUrl'
import ImageWithSpinner from './ImageWithSpinner'

const ANIMATION_DURATION = 300

enum AnimationDirection {
  NONE = 0,
  RIGHT = 100,
  LEFT = -100,
}

interface ImageViewerProps {
  images: TourData['images']
  selectedIndex?: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | undefined>>
}

export const calculateCircularIndexes = (
  currentIndex: number = 0,
  length: number,
) => ({
  prev: (currentIndex - 1 + length) % length,
  next: (currentIndex + 1) % length,
})

const ImageViewer = ({
  images,
  selectedIndex,
  setSelectedIndex,
}: ImageViewerProps) => {
  const [urls, formatUrls] = useFormattedUrl()
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [offset, setOffset] = useState<AnimationDirection>(
    AnimationDirection.NONE,
  )
  const [{ prev, next }, setIndexes] = useState(
    calculateCircularIndexes(selectedIndex, images.length),
  )
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (selectedIndex !== undefined) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedIndex])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') return setSelectedIndex(undefined)

      if (isAnimating || images.length === 1) return
      if (event.key === 'ArrowLeft') return changeImage(AnimationDirection.LEFT)
      if (event.key === 'ArrowRight')
        return changeImage(AnimationDirection.RIGHT)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleScroll = useCallback(
    throttle((event: WheelEvent) => {
      if (isAnimating || images.length === 1) return
      if (Math.abs(event.deltaX) < 20) return

      event.deltaX < 0
        ? changeImage(AnimationDirection.RIGHT)
        : changeImage(AnimationDirection.LEFT)
    }, ANIMATION_DURATION),
    [isAnimating, images.length],
  )

  useEffect(() => {
    window.addEventListener('wheel', handleScroll)
    return () => window.removeEventListener('wheel', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    function updateSize() {
      setSize({
        width: window.innerWidth * 0.9,
        height: window.innerHeight * 0.9,
      })
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    if (selectedIndex !== undefined) {
      formatUrls(
        images.map(({ src }) => ({
          src,
          width: size.width,
          height: size.height,
        })),
      )
      setIndexes(calculateCircularIndexes(selectedIndex, images.length))
    }
  }, [selectedIndex])

  const changeImage = (direction: AnimationDirection) => {
    if (isAnimating) return

    setIsAnimating(true)
    setOffset(direction)

    setTimeout(() => {
      setSelectedIndex((prevIndex?: number) => {
        if (prevIndex === undefined) return undefined
        const { prev, next } = calculateCircularIndexes(
          prevIndex,
          images.length,
        )
        return direction === AnimationDirection.RIGHT ? prev : next
      })
      setOffset(AnimationDirection.NONE)
      setIsAnimating(false)
    }, ANIMATION_DURATION)
  }

  if (selectedIndex === undefined) return null

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80"
      onClick={() => setSelectedIndex(undefined)}
    >
      <div className="relative flex h-[90vh] w-[90vw] items-center justify-center overflow-hidden">
        <div
          key={selectedIndex}
          className={`absolute flex transition-transform ease-in-out`}
          style={{
            transform: `translateX(${offset / 3}%)`,
            animationDuration: `${ANIMATION_DURATION}ms`,
            width: '300%',
          }}
        >
          <div className="flex w-1/3 justify-center">
            <ImageWithSpinner
              src={urls[prev]}
              className="max-h-full max-w-full rounded"
            />
          </div>

          <div className="flex w-1/3 justify-center">
            <ImageWithSpinner
              src={urls[selectedIndex]}
              className="max-h-full max-w-full rounded shadow-lg"
            />
          </div>

          <div className="flex w-1/3 justify-center">
            <ImageWithSpinner
              src={urls[next]}
              className="max-h-full max-w-full rounded"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default ImageViewer
