import { useInfiniteQuery } from '@tanstack/react-query'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import camelcaseKeys from 'camelcase-keys'
import React, { useEffect } from 'react'
import ActivityCard from '../components/cards/ActivityCard'
import Spinner from '../components/Spinner'
import { TourData } from '../types/api'

const fetchTours = async (
  pageParam: string,
): Promise<{ rows: Array<TourData>; nextCursor?: string }> => {
  // TODO: take the URL from a config file
  const res = await fetch(
    'https://5cmf66e3ssmsx6mikgeh3mq4mu0fhzvp.lambda-url.eu-west-1.on.aws' +
      pageParam,
  )
  const json = await res.json()
  /* const json = mockData */
  const data: { tours: Array<TourData>; links: { next: string } } =
    camelcaseKeys(json, { deep: true })

  return {
    rows: data.tours,
    nextCursor: data.links.next,
  }
}

function Feed() {
  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['tours'],
    queryFn: (ctx) => fetchTours(ctx.pageParam),
    getNextPageParam: (lastGroup) => lastGroup.nextCursor,
    initialPageParam: '',
  })
  const allRows = data ? data.pages.flatMap((d) => d.rows) : []
  const listRef = React.useRef<HTMLDivElement | null>(null)

  const virtualizer = useWindowVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    estimateSize: () => 500,
    overscan: 5,
    gap: 24,
  })

  useEffect(() => {
    const items = virtualizer.getVirtualItems()
    const lastItem = items[items.length - 1]

    if (!lastItem) {
      return
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    virtualizer.getVirtualItems(),
  ])

  return (
    <>
      {status === 'pending' ? (
        <Spinner />
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <div ref={listRef} className="flex justify-center">
          <div
            style={{ height: `${virtualizer.getTotalSize()}px` }}
            className="relative w-full max-w-[800px]"
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > allRows.length - 1
              const tourData = allRows[virtualRow.index]

              return (
                <div
                  key={virtualRow.index}
                  className="absolute top-0 left-0 w-full"
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {isLoaderRow ? (
                    hasNextPage ? (
                      <Spinner />
                    ) : (
                      "Congrats, you've seen it all! Come back later to explore new adventures!"
                    )
                  ) : (
                    <ActivityCard {...tourData} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default Feed
