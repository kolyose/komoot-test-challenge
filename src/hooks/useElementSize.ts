import { useEffect, useRef, useState } from 'react'

export default function useElementSize() {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function updateSize() {
      if (ref.current) {
        setSize(ref.current.getBoundingClientRect())
      }
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return { ref, size }
}
