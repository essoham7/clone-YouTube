export default function VideoCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-video w-full rounded-2xl bg-gray-800 animate-pulse" />
      <div className="flex gap-3">
        <div className="h-9 w-9 flex-shrink-0 rounded-full bg-gray-800 animate-pulse" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 w-3/4 rounded bg-gray-800 animate-pulse" />
          <div className="h-3 w-1/2 rounded bg-gray-800 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
