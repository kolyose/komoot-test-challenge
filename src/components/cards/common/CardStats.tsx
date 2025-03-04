import { format } from 'date-fns'
import DistanceIcon from '../../icons/Distance'
import ElevationDownIcon from '../../icons/ElevationDown'
import ElevationUpIcon from '../../icons/ElevationUp'
import TimerIcon from '../../icons/Timer'
import CardStat from './CardStat'

interface CardStatsProps {
  duration: number
  distance: number
  elevationUp: number
  elevationDown: number
}

const formatDistance = (distance: number): string =>
  distance < 1000 ? `${distance}m` : `${(distance / 1000).toFixed(1)}km`

function CardStats({
  duration,
  distance,
  elevationUp,
  elevationDown,
}: CardStatsProps) {
  return (
    <section className="flex items-center justify-evenly">
      <CardStat
        value={format(new Date(duration * 1000), 'HH:mm')}
        icon={<TimerIcon />}
      />
      <div className="h-6 border-l-1 border-gray-300" />
      <CardStat value={formatDistance(distance)} icon={<DistanceIcon />} />
      <div className="h-6 border-l-1 border-gray-300" />
      <CardStat
        value={formatDistance(elevationUp)}
        icon={<ElevationUpIcon />}
      />
      <div className="h-6 border-l-1 border-gray-300" />
      <CardStat
        value={formatDistance(elevationDown)}
        icon={<ElevationDownIcon />}
      />
    </section>
  )
}

export default CardStats
