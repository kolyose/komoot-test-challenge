import { TourData } from '../../../api'

interface CardMediaMapProps {
  image: TourData['vectorMapImage']
}

function CardMediaMap({ image }: CardMediaMapProps) {
  return (
    <section className="flex h-192 w-full">
      <img
        className="h-full w-full rounded-xs object-cover"
        src={image.src}
        alt="Map"
      />
    </section>
  )
}

export default CardMediaMap
