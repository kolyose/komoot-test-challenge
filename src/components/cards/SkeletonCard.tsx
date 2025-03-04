interface SkeletonCardProps {
  height: number
  gap: number
}

const SkeletonCard = ({ height, gap }: SkeletonCardProps) => {
  return (
    <div
      className="flex w-full flex-col gap-2 rounded bg-white p-2 shadow-md sm:p-4"
      style={{ height, marginBottom: gap }}
    >
      <span className="flex h-full animate-pulse flex-col">
        <div className="flex flex-col gap-2">
          <div className="flex w-1/2 items-center gap-2">
            <div>
              <div className="size-[30px] rounded-full bg-gray-200"></div>
            </div>
            <div className="grid w-full grid-cols-8 grid-rows-2 gap-2">
              <div className="col-span-6 h-4 rounded-lg bg-gray-200"></div>
              <div className="col-span-3 h-3 rounded-lg bg-gray-100"></div>
            </div>
          </div>
          <div className="my-2 h-5 w-1/3 rounded-xl bg-gray-200"></div>
          <hr className="border-gray-200" />
        </div>
        <div className="my-4 grid grid-cols-4 justify-items-center gap-x-4">
          <div className="h-5 w-12 rounded-xl bg-gray-100"></div>
          <div className="h-5 w-12 rounded-xl bg-gray-100"></div>
          <div className="h-5 w-12 rounded-xl bg-gray-100"></div>
          <div className="h-5 w-12 rounded-xl bg-gray-100"></div>
        </div>
        <div className="w-full flex-1 rounded bg-gray-200" />
      </span>
    </div>
  )
}

export default SkeletonCard
