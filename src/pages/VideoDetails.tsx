/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { youtubeApi } from "../services/youtubeApi";
import type { Video } from "../types/video";
import SuggestionVideo from "../components/SuggestionVideo";
import VideoDetailsSkeleton from "../components/Skeletons/VideoDetailsSkeleton";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  Scissors,
  MoreHorizontal,
  Save,
} from "lucide-react";

export default function VideoDetails() {
  const { id = "" } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [suggestions, setSuggestions] = useState<Video[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    if (!id) return;
    let active = true;
    // setLoading(true)
    setIsDescriptionExpanded(false);
    Promise.all([
      youtubeApi.fetchVideoDetails(id),
      youtubeApi.fetchSuggestedVideos(id),
      youtubeApi
        .getVideoComments(id)
        .then((d) => d)
        .catch(() => undefined),
    ])
      .then(([v, s, c]) => {
        if (active) {
          setVideo(v);
          setSuggestions(s.items);
          // Fallback if related content is empty
          if (s.items.length === 0) {
            youtubeApi.fetchHomeVideos().then((res) => {
              if (active) setSuggestions(res.items);
            });
          }
          if (c) setComments(parseComments(c));
        }
      })
      .catch((e) => setError(e?.message ?? "Erreur lors du chargement"))
      .finally(() => setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <VideoDetailsSkeleton />;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!video) return null;

  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {/* Video Player */}
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Title */}
        <h1 className="mt-4 text-xl font-bold line-clamp-2">{video.title}</h1>

        {/* Channel & Actions Bar */}
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link to={`/channel/${video.channel.id}`} className="flex-shrink-0">
              {video.channel.thumbnails?.[0]?.url ? (
                <img
                  src={video.channel.thumbnails[0].url}
                  alt={video.channel.title}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-700" />
              )}
            </Link>
            <div className="flex flex-col">
              <Link
                to={`/channel/${video.channel.id}`}
                className="font-semibold text-white hover:text-gray-100"
              >
                {video.channel.title}
              </Link>
              <span className="text-xs text-gray-400">10 k abonnés</span>
            </div>
            <button className="ml-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200">
              S'abonner
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
            <div className="flex items-center overflow-hidden rounded-full bg-white/10">
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/20">
                <ThumbsUp className="h-5 w-5" />
                {video.statistics?.likeCount
                  ? Intl.NumberFormat("fr-FR", { notation: "compact" }).format(
                      video.statistics.likeCount,
                    )
                  : "Like"}
              </button>
              <div className="h-6 w-[1px] bg-white/20" />
              <button className="px-4 py-2 hover:bg-white/20">
                <ThumbsDown className="h-5 w-5" />
              </button>
            </div>

            <button className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 hover:bg-white/20">
              <Share2 className="h-5 w-5" />
              Partager
            </button>

            <button className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 hover:bg-white/20 sm:flex">
              <Download className="h-5 w-5" />
              Télécharger
            </button>

            <button className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 hover:bg-white/20 sm:flex">
              <Scissors className="h-5 w-5" />
              Extrait
            </button>

            <button className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 hover:bg-white/20 sm:flex">
              <Save className="h-5 w-5" />
              Enregistrer
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Description Box */}
        <div className="mt-4 rounded-xl bg-white/10 p-3 text-sm">
          <div className="mb-2 font-medium">
            {video.statistics?.viewCount
              ? Intl.NumberFormat("fr-FR").format(video.statistics.viewCount)
              : 0}{" "}
            vues • {video.publishedAt}
          </div>
          <div
            className={`whitespace-pre-wrap ${
              !isDescriptionExpanded ? "line-clamp-2" : ""
            }`}
          >
            {video.description || "Aucune description disponible."}
          </div>
          {video.description ? (
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="mt-1 font-semibold text-white hover:text-gray-300"
            >
              {isDescriptionExpanded ? "Moins" : "Plus"}
            </button>
          ) : null}
        </div>

        {/* Mobile Suggestions (Visible only on mobile/tablet) */}
        <div className="mt-6 flex flex-col gap-4 lg:hidden">
          {suggestions.map((s) => (
            <SuggestionVideo key={s.id} video={s} />
          ))}
        </div>

        {/* Comments Section */}
        <section className="mt-6">
          <div className="mb-6 flex items-center gap-8">
            <h2 className="text-xl font-bold">
              {comments.length} Commentaires
            </h2>
            <div className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <MoreHorizontal className="h-5 w-5" />
              Trier par
            </div>
          </div>

          <div className="mb-6 flex gap-4">
            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-purple-600 flex items-center justify-center text-lg">
              Y
            </div>
            <div className="flex-1 border-b border-white/20 pb-2 text-gray-400">
              Ajouter un commentaire...
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {comments.map((c, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-white/10">
                  {/* Avatar placeholder if no image */}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="text-white">{c.author}</span>
                    <span className="font-normal text-gray-400">
                      {c.published}
                    </span>
                  </div>
                  <div className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-100">
                    {c.text}
                  </div>
                  <div className="mt-2 flex items-center gap-4">
                    <button className="flex items-center gap-1.5 rounded-full hover:bg-white/10 p-1 -ml-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-xs text-gray-400">
                        {c.likes > 0 ? c.likes.toLocaleString() : ""}
                      </span>
                    </button>
                    <button className="flex items-center rounded-full hover:bg-white/10 p-1">
                      <ThumbsDown className="h-4 w-4" />
                    </button>
                    <button className="text-xs font-semibold hover:bg-white/10 px-3 py-1.5 rounded-full">
                      Répondre
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {comments.length === 0 ? (
              <div className="text-sm text-gray-400">
                Aucun commentaire disponible
              </div>
            ) : null}
          </div>
        </section>
      </div>

      {/* Desktop Suggestions (Hidden on mobile/tablet) */}
      <div className="hidden flex-col gap-4 lg:flex">
        {suggestions.map((s) => (
          <SuggestionVideo key={s.id} video={s} />
        ))}
      </div>
    </div>
  );
}

function parseComments(raw: any): any[] {
  const items = raw?.comments ?? raw?.items ?? raw?.contents ?? [];
  return items
    .map((it: any) => it.comment ?? it)
    .map((c: any) => ({
      text: c.content ?? c.text ?? c.snippet?.textOriginal ?? "",
      author:
        c.author?.title ??
        c.authorText ??
        c.snippet?.authorDisplayName ??
        "Utilisateur",
      published:
        c.publishedTimeText ??
        c.publishedAt ??
        c.snippet?.publishedAt ??
        undefined,
      likes: Number(c.stats?.likes ?? c.likeCount ?? c.snippet?.likeCount ?? 0),
    }))
    .filter((c: any) => c.text);
}
