import { useInfiniteQuery } from '@tanstack/react-query'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import React, { useEffect } from 'react'
import { fetchTours } from '../api'
import ActivityCard from '../components/cards/ActivityCard'
import SkeletonCard from '../components/cards/SkeletonCard'
import Spinner from '../components/Spinner'

import 'react-toastify/dist/ReactToastify.css'

const CARD_HEIGHT = 500
const CARD_GAP = 24

const SkeletonCards = () => {
  return (
    <>
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <SkeletonCard key={index} height={CARD_HEIGHT} gap={CARD_GAP} />
        ))}
    </>
  )
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
    estimateSize: () => CARD_HEIGHT,
    gap: CARD_GAP,
    overscan: 5,
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

  useEffect(() => {
    if (status === 'error') {
      throw new Error(error.message)
    }
  }, [status])

  return (
    <>
      <div ref={listRef} className="flex justify-center">
        <div
          style={{ height: `${virtualizer.getTotalSize()}px` }}
          className="relative w-full max-w-[800px]"
        >
          {status !== 'success' ? (
            <SkeletonCards />
          ) : (
            virtualizer.getVirtualItems().map((virtualRow) => {
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
                  {isLoaderRow ? <Spinner /> : <ActivityCard {...tourData} />}
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}

export default Feed
