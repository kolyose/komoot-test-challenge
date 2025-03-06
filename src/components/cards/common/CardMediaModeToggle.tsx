interface CardMediaModeToggleProps {
  src: string
  onToggle: () => void
}

export const MEDIA_MODE_TOGGLE_SIZE = 64

function CardMediaModeToggle({ src, onToggle }: CardMediaModeToggleProps) {
  return (
    <button
      aria-label="Toggle adventure's media view"
      style={{ height: MEDIA_MODE_TOGGLE_SIZE, width: MEDIA_MODE_TOGGLE_SIZE }}
      className={`absolute right-8 bottom-8 z-10 cursor-pointer overflow-hidden rounded-md bg-white p-1 shadow-md transition-transform duration-300 ease-in-out hover:scale-105`}
      onClick={onToggle}
    >
      <img
        className="max-h-full max-w-full rounded-md object-contain"
        src={src}
        alt="Media mode toggle thumbnail"
      />
    </button>
  )
}

export default CardMediaModeToggle
