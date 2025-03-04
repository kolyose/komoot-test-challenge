const SkeletonCard = () => {
  return (
    <div className="flex h-[500px] w-full flex-col gap-2 rounded-xs bg-white p-2 sm:p-4">
      {/* Image Placeholder */}
      <div className="h-48 w-full rounded bg-gray-300"></div>

      {/* Text Placeholder */}
      <div className="mt-4 space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-300"></div>
        <div className="h-4 w-1/2 rounded bg-gray-300"></div>
      </div>
    </div>
  )
}

export default SkeletonCard
