interface CardStatProps {
  value: string
  icon: React.ReactNode
}

function CardStat({ value, icon }: CardStatProps) {
  return (
    <div className="flex items-center justify-center gap-1 p-1 text-gray-500 sm:gap-2 sm:p-2">
      <span className="size-5">{icon}</span>
      <span className="text-sm font-semibold sm:text-base">{value}</span>
    </div>
  )
}

export default CardStat
