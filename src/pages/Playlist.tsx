/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { youtubeApi } from "../services/youtubeApi";

export default function Playlist() {
  const { id = "" } = useParams<{ id: string }>();
  const [details, setDetails] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    let active = true;
    // setLoading(true)
    Promise.all([
      youtubeApi.getPlaylistDetails(id),
      youtubeApi.getPlaylistVideos(id),
    ])
      .then(([d, v]) => {
        if (active) {
          setDetails(d);
          setVideos(parsePlaylistVideos(v));
        }
      })
      .catch((e) => setError(e?.message ?? "Erreur lors du chargement"))
      .finally(() => setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <div className="p-6 text-center">Chargement…</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!details) return null;

  const title = details.title;
  const channelTitle = details.author?.title;
  const videoCount = details.videoCount;
  const thumb = details.thumbnails?.[0]?.url;

  return (
    <div className="flex flex-col gap-8 p-6 lg:flex-row">
      {/* Left Info Column */}
      <div className="flex flex-col gap-4 lg:w-80 lg:flex-shrink-0">
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-800 shadow-lg lg:aspect-[3/2]">
          {thumb ? (
            <img
              src={thumb}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="text-sm text-gray-400">
            <div className="font-semibold text-white">{channelTitle}</div>
            <div className="mt-1">
              {videoCount} vidéos • {details.lastUpdated}
            </div>
            {details.description ? (
              <p className="mt-4 line-clamp-4 whitespace-pre-wrap text-sm">
                {details.description}
              </p>
            ) : null}
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 rounded-full bg-white py-2 text-sm font-medium text-black hover:bg-gray-200">
            Tout lire
          </button>
          <button className="flex-1 rounded-full bg-white/10 py-2 text-sm font-medium text-white hover:bg-white/20">
            Aléatoire
          </button>
        </div>
      </div>

      {/* Right Video List */}
      <div className="flex flex-1 flex-col gap-2">
        {videos.map((v, idx) => (
          <div
            key={v.id}
            className="group flex gap-3 rounded-xl p-2 hover:bg-white/10"
          >
            <div className="flex w-8 items-center justify-center text-sm text-gray-400">
              {idx + 1}
            </div>
            <Link
              to={`/watch/${v.id}`}
              className="aspect-video w-40 flex-shrink-0 overflow-hidden rounded-lg bg-gray-800"
            >
              <img
                src={v.thumbnails?.[0]?.url}
                alt={v.title}
                className="h-full w-full object-cover"
              />
            </Link>
            <div className="flex min-w-0 flex-col justify-center">
              <Link
                to={`/watch/${v.id}`}
                className="line-clamp-2 text-sm font-semibold text-white hover:underline"
              >
                {v.title}
              </Link>
              <div className="mt-1 text-xs text-gray-400">
                <Link
                  to={`/channel/${v.channel?.id}`}
                  className="hover:text-white"
                >
                  {v.channel?.title}
                </Link>
                <span> • {v.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function parsePlaylistVideos(raw: any): any[] {
  const items = raw?.contents ?? raw?.items ?? [];
  return items
    .map((c: any) => c.video ?? c)
    .map((it: any) => ({
      id: it.videoId ?? it.id,
      title: it.title,
      channel: {
        id: it.author?.channelId ?? it.channelId ?? "",
        title: it.author?.title ?? "",
      },
      thumbnails: it.thumbnails ?? [],
      duration: it.lengthText ?? it.lengthSeconds,
    }))
    .filter((v: any) => v.id);
}
