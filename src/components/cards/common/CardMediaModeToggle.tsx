interface CardMediaModeToggleProps {
  src: string
  onToggle: () => void
}

export const MEDIA_MODE_TOGGLE_SIZE = 80

function CardMediaModeToggle({ src, onToggle }: CardMediaModeToggleProps) {
  return (
    <button
      aria-label="Toggle adventure's media view"
      style={{ height: MEDIA_MODE_TOGGLE_SIZE, width: MEDIA_MODE_TOGGLE_SIZE }}
      className={`absolute right-8 bottom-8 z-10 cursor-pointer overflow-hidden rounded-md bg-white p-[5px] shadow-md transition-[padding] duration-300 ease-in-out hover:p-[3px]`}
      onClick={onToggle}
    >
      <img
        className="max-h-full max-w-full rounded-md object-cover"
        src={src}
        alt="Media mode toggle thumbnail"
      />
    </button>
  )
}

export default CardMediaModeToggle
