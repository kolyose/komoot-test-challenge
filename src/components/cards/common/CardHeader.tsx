import { useEffect } from 'react'
import { TourCreator, TourData } from '../../../api'
import useFormattedUrl from '../../../hooks/useFormattedUrl'
import Popover from '../../Popover'
import PremiumAccountIcon from '../../icons/PremiumAccount'
import RegularAccountIcon from '../../icons/RegularAccount'

interface CardHeaderProps {
  name: TourData['displayName']
  isPremium: TourData['isPremium']
  title: TourData['name']
  date: TourData['date']
  username: TourCreator['username']
  src: TourCreator['avatar']['src']
}

const AVATAR_SMALL_SIZE = 30
const AVATAR_MEDIUM_SIZE = 50
function CardHeader({
  title,
  src,
  name,
  date,
  username,
  isPremium,
}: CardHeaderProps) {
  const [urls, formatUrls] = useFormattedUrl()
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  useEffect(() => {
    formatUrls([
      { src, width: AVATAR_SMALL_SIZE, height: AVATAR_SMALL_SIZE },
      { src, width: AVATAR_MEDIUM_SIZE, height: AVATAR_MEDIUM_SIZE },
    ])
  }, [])

  return (
    <header className="items-left flex flex-col gap-2 text-left">
      <div className="flex items-center justify-start gap-2">
        <div>
          <img className="rounded-full" src={urls[0]} alt="User avatar" />
        </div>
        <div className="flex flex-col items-start">
          <div className="inline">
            <Popover
              trigger={
                <a href="#" className="whitespace-nowrap text-blue-500">
                  {name}
                </a>
              }
            >
              <div className="relative inset-0 flex h-auto w-auto items-center justify-start gap-4 rounded border-gray-300">
                <div className="shrink-0">
                  <img
                    className="rounded-full"
                    src={urls[1]}
                    alt="User avatar"
                  />
                </div>
                <div className="shrink-0 text-xl font-bold">{username}</div>
                <div className="flex h-8 w-8">
                  {isPremium === 'true' ? (
                    <PremiumAccountIcon />
                  ) : (
                    <RegularAccountIcon />
                  )}
                </div>
              </div>
            </Popover>
            <span> went on an adventure</span>
          </div>
          <p className="text-gray-500">{formattedDate}</p>
        </div>
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <hr className="border-gray-200" />
    </header>
  )
}

export default CardHeader
