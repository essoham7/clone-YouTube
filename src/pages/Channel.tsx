/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { youtubeApi } from "../services/youtubeApi";
import VideoCard from "../components/VideoCard";
import ChannelSkeleton from "../components/Skeletons/ChannelSkeleton";

export default function Channel() {
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
      youtubeApi.getChannelDetails(id),
      youtubeApi.getChannelVideos({ id, filter: "videos_latest" }),
    ])
      .then(([d, v]) => {
        console.log("Channel details:", d);
        if (active) {
          setDetails(d);
          setVideos(parseVideos(v));
        }
      })
      .catch((e) => setError(e?.message ?? "Erreur lors du chargement"))
      .finally(() => setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <ChannelSkeleton />;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!details) return null;

  const banner =
    details.banner?.desktop?.[0]?.url ?? details.banner?.mobile?.[0]?.url;
  const avatar = details.avatar?.[0]?.url ?? details.avatar?.[0]?.src;
  const title = details.title;
  const subCount = details.stats?.subscribersText;
  const videoCount = details.stats?.videosText;
  const description = details.description;

  return (
    <div className="flex flex-col">
      {/* Banner */}
      {banner ? (
        <div className="aspect-[6/1] w-full overflow-hidden bg-gray-800 md:aspect-[5/1] lg:aspect-[6/1]">
          <img
            src={banner}
            alt="Bannière"
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      {/* Header Info */}
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 p-6 md:flex-row md:items-start">
        {avatar ? (
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full md:h-32 md:w-32">
            <img
              src={avatar}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
          <div className="mt-2 text-sm text-gray-400">
            <span>{details.username}</span>
            <span className="mx-1">•</span>
            <span>{subCount}</span>
            <span className="mx-1">•</span>
            <span>{videoCount}</span>
          </div>
          {description ? (
            <p className="mt-3 line-clamp-2 max-w-2xl text-sm text-gray-400">
              {description}
            </p>
          ) : null}
          <div className="mt-4">
            <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200">
              S'abonner
            </button>
          </div>
        </div>
      </div>

      {/* Tabs (Simplified) */}
      <div className="border-b border-white/10 px-6">
        <div className="mx-auto flex max-w-5xl gap-8 text-sm font-medium text-gray-400">
          <div className="border-b-2 border-white pb-3 text-white">Vidéos</div>
          <div className="pb-3 hover:text-white">Playlists</div>
          <div className="pb-3 hover:text-white">Communauté</div>
          <div className="pb-3 hover:text-white">Chaînes</div>
          <div className="pb-3 hover:text-white">À propos</div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-5xl p-6">
        <h2 className="mb-4 text-lg font-semibold">Vidéos récentes</h2>
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </div>
  );
}

function parseVideos(raw: any): any[] {
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
      statistics: {
        viewCount: Number(
          it.stats?.views ??
            it.viewCountText?.split(" ")[0]?.replace(/\D/g, "") ??
            0,
        ),
      },
      publishedAt: it.publishedTimeText,
    }))
    .filter((v: any) => v.id);
}
