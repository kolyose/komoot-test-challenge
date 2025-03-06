import { renderHook, waitFor } from '@testing-library/react'
import useFormattedUrl, { injectSizeIntoUrl } from './useFormattedUrl'

const images = [
  'https://picsum.photos/seed/80306371/{width}/{height}',
  'https://i.pravatar.cc/{width}',
]

describe('injectSizeIntoUrl()', () => {
  test('replaces width and height placeholders in the url', () => {
    const url = images[0]
    const width = 200
    const height = 100

    const result = injectSizeIntoUrl(url, width, height)
    expect(result).toEqual('https://picsum.photos/seed/80306371/200/100')
  })

  test('replaces only width placeholder, if height is not provided', () => {
    const url = images[1]
    const width = 200

    const result = injectSizeIntoUrl(url, width)
    expect(result).toEqual('https://i.pravatar.cc/200')
  })

  test('replaces both placeholders with width value, if height is not provided', () => {
    const url = images[0]
    const width = 200

    const result = injectSizeIntoUrl(url, width)
    expect(result).toEqual('https://picsum.photos/seed/80306371/200/200')
  })
})

describe('useFormattedUrl()', () => {
  test('formats and stores the urls', async () => {
    const { result } = renderHook(() => useFormattedUrl())
    const [_, format] = result.current
    format(images.map((src) => ({ src, width: 200, height: 100 })))

    await waitFor(() => {
      const [urls] = result.current
      expect(urls).toEqual([
        'https://picsum.photos/seed/80306371/200/100',
        'https://i.pravatar.cc/200',
      ])
    })
  })
})
