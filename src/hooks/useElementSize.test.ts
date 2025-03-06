import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import useElementSize from './useElementSize'

describe('useElementSize()', () => {
  test('updates size on window resize', () => {
    const { result } = renderHook(() => useElementSize())
    act(() => {
      result.current.ref.current = {
        getBoundingClientRect: vi.fn(() => ({
          width: 800,
          height: 600,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          x: 0,
          y: 0,
          toJSON: () => {},
        })),
      } as unknown as HTMLDivElement
    })
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })
    expect(result.current.size.width).toEqual(800)
    expect(result.current.size.height).toEqual(600)
  })
})
