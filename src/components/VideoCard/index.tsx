import { Link } from "react-router-dom";
import type { Video } from "../../types/video";

export default function VideoCard({ video }: { video: Video }) {
  const thumb = video.thumbnails?.[0]?.url;
  return (
    <div className="group flex flex-col gap-3">
      <Link
        to={`/watch/${video.id}`}
        className="block aspect-video w-full overflow-hidden rounded-2xl bg-gray-800"
      >
        {thumb ? (
          <img
            src={thumb}
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
        ) : null}
      </Link>
      <div className="flex gap-3">
        <Link to={`/channel/${video.channel.id}`} className="flex-shrink-0">
          {video.channel.thumbnails?.[0]?.url ? (
            <img
              src={video.channel.thumbnails[0].url}
              alt={video.channel.title}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-gray-700" />
          )}
        </Link>
        <div className="flex flex-col">
          <Link
            to={`/watch/${video.id}`}
            className="line-clamp-2 text-base font-semibold leading-snug text-white hover:text-gray-100"
          >
            {video.title}
          </Link>
          <div className="mt-1 text-sm text-gray-400">
            <Link
              to={`/channel/${video.channel.id}`}
              className="hover:text-white"
            >
              {video.channel.title}
            </Link>
            <div className="flex flex-wrap items-center text-xs text-gray-400">
              {typeof video.statistics?.viewCount === "number" ? (
                <span>
                  {Intl.NumberFormat("fr-FR", { notation: "compact" }).format(
                    video.statistics.viewCount,
                  )}{" "}
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
          </div>
        </div>
      </div>
    </div>
  );
}
