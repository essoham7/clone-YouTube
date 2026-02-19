export default function ChannelSkeleton() {
  return (
    <div className="flex flex-col">
      {/* Banner Skeleton */}
      <div className="aspect-[6/1] w-full bg-gray-800 animate-pulse md:aspect-[5/1] lg:aspect-[6/1]" />
      
      {/* Header Info Skeleton */}
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 p-6 md:flex-row md:items-start">
        <div className="h-20 w-20 flex-shrink-0 rounded-full bg-gray-800 animate-pulse md:h-32 md:w-32" />
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="h-6 w-48 rounded bg-gray-800 animate-pulse" />
          <div className="mt-2 h-4 w-32 rounded bg-gray-800 animate-pulse" />
          <div className="mt-2 h-4 w-24 rounded bg-gray-800 animate-pulse" />
          <div className="mt-4 h-9 w-32 rounded-full bg-gray-800 animate-pulse" />
        </div>
      </div>
      
      {/* Content Skeleton */}
      <div className="mx-auto w-full max-w-5xl p-6">
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="aspect-video w-full rounded-2xl bg-gray-800 animate-pulse" />
              <div className="flex gap-3">
                <div className="h-9 w-9 flex-shrink-0 rounded-full bg-gray-800 animate-pulse" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-4 w-3/4 rounded bg-gray-800 animate-pulse" />
                  <div className="h-3 w-1/2 rounded bg-gray-800 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
