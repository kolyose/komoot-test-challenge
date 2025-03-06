import { useEffect, useRef, useState } from 'react'
import Spinner from '../Spinner'

const ImageWithSpinner = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    setIsLoading(true)
  }, [])

  return (
    <div className="relative h-full w-full">
      <img
        ref={ref}
        onLoad={() => setIsLoading(false)}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'}`}
        {...props}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default ImageWithSpinner
