import { useState } from 'react'

export const injectSizeIntoUrl = (
  url: string,
  width: number,
  height?: number,
) => {
  const processedUrl = url
    .replace(/\{width\}/g, Math.round(width).toString())
    .replace(/\{height\}/g, Math.round(height || width).toString())

  return processedUrl
}

export interface UrlFormatData {
  src: string
  width: number
  height: number
}

export default function useFormattedUrl() {
  const [state, setState] = useState<Array<string>>([])

  function format(urlData: Array<UrlFormatData>) {
    const formattedUrls = urlData.map(({ src, width, height }) =>
      injectSizeIntoUrl(src, width, height),
    ) as Array<string>

    setState(formattedUrls)
  }

  return [state, format] as const
}
