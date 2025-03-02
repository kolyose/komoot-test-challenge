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
