interface CardMediaModeToggleProps {
  src: string
  onToggle: () => void
}

export const MEDIA_MODE_TOGGLE_SIZE = 64

function CardMediaModeToggle({ src, onToggle }: CardMediaModeToggleProps) {
  return (
    <button
      className={`absolute right-8 bottom-8 h-[${MEDIA_MODE_TOGGLE_SIZE}px] w-[${MEDIA_MODE_TOGGLE_SIZE}px] cursor-pointer overflow-hidden rounded-md bg-white p-1 shadow-md transition-transform duration-300 ease-in-out hover:scale-105`}
      onClick={onToggle}
    >
      <img className="rounded-md object-scale-down" src={src} alt="Preview" />
    </button>
  )
}

export default CardMediaModeToggle
