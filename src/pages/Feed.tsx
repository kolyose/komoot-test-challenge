import { useInfiniteQuery } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import camelcaseKeys from 'camelcase-keys'
import React, { useEffect } from 'react'
import mockData from '../../data.json'
import ActivityCard from '../components/ActivityCard'
import { TourData } from '../types/api'

const fetchTours = async (
  pageParam: string,
): Promise<{ rows: Array<TourData>; nextCursor?: string }> => {
  // TODO: take the URL from a config file
  /*  const res = await fetch(
    'https://5cmf66e3ssmsx6mikgeh3mq4mu0fhzvp.lambda-url.eu-west-1.on.aws' +
      pageParam,
  )
  const json = await res.json() */
  const json = mockData
  const data: { tours: Array<TourData>; links: { next: string } } =
    camelcaseKeys(json, { deep: true })

  return {
    rows: data.tours.slice(0, 3),
    nextCursor: undefined /* data.links.next */,
  }
}

function Feed() {
  const {
    status,
    data,
    error,
    isFetching,
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
  const parentRef = React.useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 500,
    overscan: 5,
    gap: 24,
  })

  useEffect(() => {
    const items = rowVirtualizer.getVirtualItems()
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
    rowVirtualizer.getVirtualItems(),
  ])

  return (
    <div>
      {status === 'pending' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <div
          ref={parentRef}
          className="flex h-screen w-full justify-center overflow-auto p-4"
        >
          <div
            style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
            className="relative w-full max-w-[800px]"
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
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
                      'Loading more...'
                    ) : (
                      'Nothing more to load'
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
      <div>
        {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
      </div>
    </div>
  )
}

export default Feed
