import { useState } from 'react'

export const injectSizeIntoUrl = (
  url: string,
  width: number,
  height?: number,
) => {
  const processedUrl = url
    .replace(/\{width\}/g, width.toString())
    .replace(/\{height\}/g, (height || width).toString())

  console.log('URL:', processedUrl)
  return processedUrl
}

export interface UrlFormatData {
  src: string
  width: number
  height: number
}

export default function useFormattedUrlCache() {
  const [cache, setCache] = useState<Array<string>>([])

  function format(urlData: Array<UrlFormatData>) {
    const formattedUrls = urlData.map(({ src, width, height }) =>
      injectSizeIntoUrl(src, width, height),
    ) as Array<string>

    setCache(formattedUrls)
  }

  return [cache, format] as const
}
