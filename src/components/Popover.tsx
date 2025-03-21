import { useEffect, useState } from 'react'

const Popover = ({
  trigger,
  children,
  onChange,
}: {
  trigger: React.ReactNode
  children: React.ReactNode
  onChange?: (isOpen: boolean) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    onChange?.(isOpen)
  }, [isOpen])

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button aria-label="Expand user info">{trigger}</button>

      <div
        className={`absolute top-0 left-0 mt-6 w-max rounded-lg border border-gray-200 bg-white p-4 transition-opacity duration-300 ${
          isOpen
            ? 'scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default Popover
