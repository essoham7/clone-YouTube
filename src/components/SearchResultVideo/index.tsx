import { Link } from 'react-router-dom'
import type { Video } from '../../types/video'

export default function SearchResultVideo({ video }: { video: Video }) {
  const thumb = video.thumbnails?.[0]?.url
  return (
    <div className="flex gap-4">
      <Link
        to={`/watch/${video.id}`}
        className="aspect-video w-60 flex-shrink-0 overflow-hidden rounded-lg bg-gray-800"
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
          className="line-clamp-2 text-lg font-normal text-white"
        >
          {video.title}
        </Link>
        <div className="text-xs text-gray-400">
          {typeof video.statistics?.viewCount === 'number' ? (
            <span>
              {Intl.NumberFormat('fr-FR', { notation: 'compact' }).format(
                video.statistics.viewCount
              )}{' '}
              vues
            </span>
          ) : null}
          {video.publishedAt ? (
            <>
              <span className="mx-1">•</span>
              <span>{video.publishedAt}</span>
            </>
          ) : null}
        </div>
        <div className="mt-3 flex items-center gap-2 py-1">
          <Link
            to={`/channel/${video.channel.id}`}
            className="flex-shrink-0"
          >
            {video.channel.thumbnails?.[0]?.url ? (
              <img
                src={video.channel.thumbnails[0].url}
                alt={video.channel.title}
                className="h-6 w-6 rounded-full object-cover"
              />
            ) : (
              <div className="h-6 w-6 rounded-full bg-gray-700" />
            )}
          </Link>
          <Link
            to={`/channel/${video.channel.id}`}
            className="text-sm text-gray-400 hover:text-white"
          >
            {video.channel.title}
          </Link>
        </div>
        <div className="mt-1 line-clamp-2 text-sm text-gray-400">
          {video.description}
        </div>
      </div>
    </div>
  )
}
