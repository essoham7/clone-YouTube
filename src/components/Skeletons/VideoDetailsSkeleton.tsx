export default function VideoDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {/* Video Player Skeleton */}
        <div className="aspect-video w-full rounded-xl bg-gray-800 animate-pulse" />
        
        {/* Title Skeleton */}
        <div className="mt-4 h-6 w-3/4 rounded bg-gray-800 animate-pulse" />
        
        {/* Channel & Actions Skeleton */}
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-gray-800 animate-pulse" />
            <div className="flex flex-col gap-2 w-32">
              <div className="h-4 w-full rounded bg-gray-800 animate-pulse" />
              <div className="h-3 w-1/2 rounded bg-gray-800 animate-pulse" />
            </div>
            <div className="ml-2 h-9 w-24 rounded-full bg-gray-800 animate-pulse" />
          </div>
          
          <div className="flex gap-2">
            <div className="h-9 w-24 rounded-full bg-gray-800 animate-pulse" />
            <div className="h-9 w-24 rounded-full bg-gray-800 animate-pulse" />
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="mt-4 h-32 rounded-xl bg-gray-800 animate-pulse" />
        
        {/* Comments Skeleton */}
        <div className="mt-8 flex flex-col gap-6">
          <div className="h-6 w-48 rounded bg-gray-800 animate-pulse" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-gray-800 animate-pulse" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-4 w-32 rounded bg-gray-800 animate-pulse" />
                <div className="h-3 w-full rounded bg-gray-800 animate-pulse" />
                <div className="h-3 w-3/4 rounded bg-gray-800 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Suggestions Skeleton */}
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-3">
            <div className="aspect-video w-40 rounded-md bg-gray-800 animate-pulse" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-3 w-full rounded bg-gray-800 animate-pulse" />
              <div className="h-3 w-2/3 rounded bg-gray-800 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
