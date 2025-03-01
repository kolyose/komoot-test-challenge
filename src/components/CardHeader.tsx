interface CardHeaderProps {
  displayName: string
  avatarUrl: string
}

function CardHeader({ displayName, avatarUrl }: CardHeaderProps) {
  return (
    <header className="flex">
      <div>
        <img
          className="rounded-full"
          src={avatarUrl.replace(/\{width\}/g, '30')}
          alt="avatar"
        />
      </div>
      <h2>{displayName}</h2>
    </header>
  )
}

export default CardHeader
