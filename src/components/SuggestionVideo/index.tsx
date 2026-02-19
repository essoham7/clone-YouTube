import { Link } from 'react-router-dom'
import type { Video } from '../../types/video'

export default function SuggestionVideo({ video }: { video: Video }) {
  const thumb = video.thumbnails?.[0]?.url
  return (
    <div className="flex gap-3">
      <Link
        to={`/watch/${video.id}`}
        className="aspect-video w-48 flex-shrink-0 overflow-hidden rounded-md bg-gray-800"
      >
        {thumb ? (
          <img
            src={thumb}
            alt={video.title}
            className="h-full w-full object-cover"
          />
        ) : null}
      </Link>
      <div className="flex min-w-0 flex-col">
        <Link
          to={`/watch/${video.id}`}
          className="line-clamp-2 text-sm font-semibold text-white hover:text-gray-100"
        >
          {video.title}
        </Link>
        <div className="mt-1 text-xs text-gray-400">
          <Link
            to={`/channel/${video.channel.id}`}
            className="hover:text-white"
          >
            {video.channel.title}
          </Link>
        </div>
      </div>
    </div>
  )
}
