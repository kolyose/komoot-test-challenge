import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import 'swiper/css'
import 'swiper/css/pagination'
import { Keyboard, Mousewheel, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { TourData } from '../../api'
import useFormattedUrl from '../../hooks/useFormattedUrl'
import ImageWithSpinner from './ImageWithSpinner'

import Spinner from '../Spinner'
import './ImageGallery.css'

interface ImageViewerProps {
  images: TourData['images']
  selectedIndex?: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | undefined>>
}

const ImageGallery = ({
  images,
  selectedIndex,
  setSelectedIndex,
}: ImageViewerProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [urls, formatUrls] = useFormattedUrl()
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    formatUrls(
      images.map(({ src }) => ({
        src,
        width: size.width,
        height: size.height,
      })),
    )
  }, [size])

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
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [selectedIndex])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(undefined)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [setSelectedIndex])

  if (selectedIndex === undefined) return null

  return ReactDOM.createPortal(
    <div
      data-testid="image-gallery"
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80"
      onClick={() => setSelectedIndex(undefined)}
    >
      <div className="relative flex h-[90vh] w-[90vw] items-center justify-center">
        <Swiper
          initialSlide={selectedIndex}
          spaceBetween={window.innerWidth * 0.9}
          slidesPerView={1}
          mousewheel
          className="custom-swiper"
          pagination={{
            dynamicBullets: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          loop
          keyboard
          modules={[Mousewheel, Pagination, Keyboard]}
        >
          {images.map(({ id }, index) => {
            return (
              <SwiperSlide onLoad={() => setIsLoading(false)} key={id}>
                <ImageWithSpinner
                  src={urls[index]}
                  alt={`Adventure image gallery slide ${index + 1}`}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

export default ImageGallery
