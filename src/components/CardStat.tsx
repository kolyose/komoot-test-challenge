interface CardStatProps {
  value: string
  icon: React.ReactNode
}

function CardStat({ value, icon }: CardStatProps) {
  return (
    <div className="flex items-center justify-center gap-2 p-2 text-gray-500">
      <span className="size-5">{icon}</span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}

export default CardStat
