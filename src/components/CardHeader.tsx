import { useEffect } from 'react'
import useFormattedUrlCache from '../hooks/useFormattedUrlCache'

interface CardHeaderProps {
  name: string
  src: string
  title: string
  date: string
}

const AVATAR_SIZE = 30
function CardHeader({ title, src, name, date }: CardHeaderProps) {
  const [[avatarUrl], formatAndCacheUrls] = useFormattedUrlCache()

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  useEffect(() => {
    formatAndCacheUrls([{ src, width: AVATAR_SIZE, height: AVATAR_SIZE }])
  }, [])

  return (
    <header className="items-left flex flex-col gap-2 text-left">
      <div className="flex items-center justify-start gap-2">
        <div>
          <img className="rounded-full" src={avatarUrl} alt="Avatar" />
        </div>
        <div className="flex flex-col items-start">
          <div>
            <span>{name}</span>
            <span>went on an adventure</span>
          </div>
          <p className="text-gray-500">{formattedDate}</p>
        </div>
      </div>
      <h3>{title}</h3>
      <hr className="border-gray-200" />
    </header>
  )
}

export default CardHeader
