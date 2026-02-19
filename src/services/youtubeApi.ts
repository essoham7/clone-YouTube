/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { PaginatedResponse, Video } from "../types/video";

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY as string | undefined;
const RAPIDAPI_HOST = (import.meta.env.VITE_RAPIDAPI_HOST ??
  "youtube-v31.p.rapidapi.com") as string;
const ENV_BASE = import.meta.env.VITE_RAPIDAPI_BASE_URL as string | undefined;
const BASE_URL = (
  ENV_BASE
    ? ENV_BASE.startsWith("http")
      ? ENV_BASE
      : `https://${ENV_BASE}`
    : `https://${RAPIDAPI_HOST}`
) as string;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-RapidAPI-Key": RAPIDAPI_KEY ?? "",
    "X-RapidAPI-Host": RAPIDAPI_HOST,
  },
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 429) {
      const originalRequest = error.config;
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return client(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

const cache = new Map<string, { timestamp: number; data: any }>();
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

async function getCached(url: string, config?: any) {
  const key = `${url}:${JSON.stringify(config)}`;
  const now = Date.now();
  if (cache.has(key)) {
    const entry = cache.get(key)!;
    if (now - entry.timestamp < CACHE_DURATION) {
      return { data: entry.data };
    }
  }
  const response = await client.get(url, config);
  cache.set(key, { timestamp: now, data: response.data });
  return response;
}

export async function fetchHomeVideos(
  query = "trending",
  params?: { hl?: string; gl?: string },
): Promise<PaginatedResponse<Video>> {
  const { data } = await getCached("/search/", {
    params: { q: query, hl: params?.hl ?? "en", gl: params?.gl ?? "US" },
  });
  return mapYoutube138List(data);
}

export async function fetchHome(opts?: { hl?: string; gl?: string }) {
  const { data } = await getCached("/home/", {
    params: { hl: opts?.hl ?? "en", gl: opts?.gl ?? "US" },
  });
  return mapYoutube138List(data);
}

export async function searchVideos(
  q: string,
  opts?: { hl?: string; gl?: string },
) {
  const { data } = await getCached("/search/", {
    params: { q, hl: opts?.hl ?? "en", gl: opts?.gl ?? "US" },
  });
  return mapYoutube138List(data);
}

export async function fetchVideoDetails(id: string): Promise<Video> {
  const { data } = await getCached("/video/details/", { params: { id } });
  return mapYoutube138Details(data);
}

export async function getVideoDetailsV2(
  video_id: string,
  opts?: { hl?: string },
) {
  const { data } = await getCached("/v2/video-details", {
    params: { video_id, hl: opts?.hl ?? "en" },
  });
  return mapYoutube138Details(data);
}

export async function fetchSuggestedVideos(
  id: string,
): Promise<PaginatedResponse<Video>> {
  const { data } = await getCached("/video/related-contents/", {
    params: { id },
  });
  return mapYoutube138Related(data);
}

export async function fetchStreamingData(id: string) {
  const { data } = await getCached("/video/streaming-data/", {
    params: { id },
  });
  return data;
}

export async function autoComplete(
  q: string,
  opts?: { hl?: string; gl?: string },
) {
  const { data } = await getCached("/auto-complete/", {
    params: { q, hl: opts?.hl ?? "en", gl: opts?.gl ?? "US" },
  });
  const raw = data?.results ?? data?.suggestions ?? data?.items ?? [];
  const suggestions: string[] = raw
    .map((it: any) => it.query ?? it.q ?? it.suggestion ?? it)
    .filter((s: any) => typeof s === "string" && s.length > 0);
  return suggestions;
}

export async function fetchTrending(opts?: {
  country?: string;
  lang?: string;
  section?: string;
}) {
  const { data } = await getCached("/v2/trending", {
    params: {
      country: opts?.country,
      lang: opts?.lang,
      section: opts?.section ?? "Now",
    },
  });
  return mapYoutube138List(data);
}

export async function getChannelDetails(
  id: string,
  opts?: { hl?: string; gl?: string },
) {
  const { data } = await getCached("/channel/details/", {
    params: { id, hl: opts?.hl ?? "en", gl: opts?.gl ?? "US" },
  });
  return data;
}

export async function getChannelDetailsV2(
  channel_id: string,
  opts?: { hl?: string },
) {
  const { data } = await getCached("/v2/channel-details", {
    params: { channel_id, hl: opts?.hl ?? "en" },
  });
  return data;
}

export async function getChannelVideos(params: {
  id: string;
  filter?: string;
  hl?: string;
  gl?: string;
}) {
  const { data } = await getCached("/channel/videos/", {
    params: {
      id: params.id,
      filter: params.filter ?? "videos_latest",
      hl: params.hl ?? "en",
      gl: params.gl ?? "US",
    },
  });
  return data;
}

export async function getChannelVideosPage(body: {
  id: string;
  filter?: string;
  cursor?: string;
  hl?: string;
  gl?: string;
}) {
  const { data } = await client.post(
    "/channel/videos/",
    {
      id: body.id,
      filter: body.filter ?? "videos_latest",
      cursor: body.cursor ?? "",
      hl: body.hl ?? "en",
      gl: body.gl ?? "US",
    },
    { headers: { "Content-Type": "application/json" } },
  );
  return data;
}

export async function getChannelPlaylists(
  id: string,
  opts?: { hl?: string; gl?: string },
) {
  const { data } = await getCached("/channel/playlists/", {
    params: { id, hl: opts?.hl ?? "en", gl: opts?.gl ?? "US" },
  });
  return data;
}

export async function getChannelCommunity(id: string) {
  const { data } = await getCached("/channel/community/", { params: { id } });
  return data;
}

export async function getChannelChannels(
  id: string,
  opts?: { hl?: string; gl?: string },
) {
  const { data } = await getCached("/channel/channels/", {
    params: { id, hl: opts?.hl ?? "en", gl: opts?.gl ?? "US" },
  });
  return data;
}

export async function channelSearch(params: {
  id: string;
  q: string;
  hl?: string;
  gl?: string;
}) {
  const { data } = await getCached("/channel/search/", {
    params: {
      id: params.id,
      q: params.q,
      hl: params.hl ?? "en",
      gl: params.gl ?? "US",
    },
  });
  return data;
}

export async function getVideoComments(
  id: string,
  opts?: { hl?: string; gl?: string },
) {
  const { data } = await getCached("/video/comments/", {
    params: { id, hl: opts?.hl ?? "en", gl: opts?.gl ?? "US" },
  });
  return data;
}

export async function getPlaylistDetails(
  id: string,
  opts?: { hl?: string; gl?: string },
) {
  const { data } = await getCached("/playlist/details/", {
    params: { id, hl: opts?.hl ?? "en", gl: opts?.gl ?? "US" },
  });
  return data;
}

export async function getPlaylistVideos(
  id: string,
  opts?: { hl?: string; gl?: string },
) {
  const { data } = await getCached("/playlist/videos/", {
    params: { id, hl: opts?.hl ?? "en", gl: opts?.gl ?? "US" },
  });
  return data;
}

export async function getCommunityPostDetails(id: string) {
  const { data } = await getCached("/community-post/details/", {
    params: { id },
  });
  return data;
}

export async function getCommunityPostComments() {
  const { data } = await getCached("/community-post/comments/");
  return data;
}

function mapYoutube138Thumbs(
  thumbs: any,
): { url: string; width: number; height: number }[] {
  if (!thumbs) return [];
  const arr = Array.isArray(thumbs) ? thumbs : Object.values(thumbs);
  return arr
    .map((t: any) => ({
      url: t.url ?? t.src ?? "",
      width: t.width ?? 0,
      height: t.height ?? 0,
    }))
    .filter((t: any) => !!t.url);
}

function mapYoutube138Item(it: any): Video {
  const videoId = it.videoId ?? it.video?.videoId ?? it.id ?? it.video?.id;
  const title = it.title ?? it.video?.title ?? it.snippet?.title ?? "";
  const channelTitle =
    it.author?.title ??
    it.channelTitle ??
    it.video?.author?.title ??
    it.snippet?.channelTitle ??
    "";
  const channelId =
    it.author?.channelId ??
    it.channelId ??
    it.video?.author?.channelId ??
    it.snippet?.channelId ??
    "";
  const thumbs =
    it.thumbnails ??
    it.video?.thumbnails ??
    it.snippet?.thumbnails ??
    it.richThumbnail ??
    undefined;
  const channelThumbnails =
    it.author?.avatar ??
    it.author?.thumbnails ??
    it.video?.author?.avatar ??
    it.snippet?.thumbnails ?? // Fallback if no specific author avatar
    undefined;
  const stats = it.stats ?? it.video?.stats ?? it.statistics;
  return {
    id: String(videoId ?? ""),
    title,
    description:
      it.description ?? it.video?.description ?? it.snippet?.description,
    publishedAt: it.publishedTime ?? it.publishedAt ?? it.snippet?.publishedAt,
    channel: {
      id: String(channelId ?? ""),
      title: String(channelTitle ?? ""),
      thumbnails: mapYoutube138Thumbs(channelThumbnails),
    },
    thumbnails: mapYoutube138Thumbs(thumbs),
    statistics: stats
      ? {
          viewCount: Number(
            stats.views ??
              stats.viewCount ??
              stats.viewCountText?.split(" ")[0]?.replace(/\D/g, "") ??
              0,
          ),
          likeCount: Number(
            stats.likes ??
              stats.likeCount ??
              stats.likeCountText?.split(" ")[0]?.replace(/\D/g, "") ??
              0,
          ),
        }
      : undefined,
  };
}

function mapYoutube138List(data: any): PaginatedResponse<Video> {
  const contents = data?.contents ?? data?.items ?? [];
  const items: Video[] = contents
    .map((c: any) => c.video ?? c)
    .map((it: any) => mapYoutube138Item(it))
    .filter((v: Video) => v.id);
  return { items };
}

function mapYoutube138Related(data: any): PaginatedResponse<Video> {
  const items: Video[] = (data?.contents ?? [])
    .map((c: any) => c.video ?? c)
    .map((it: any) => mapYoutube138Item(it))
    .filter((v: Video) => v.id);
  return { items };
}

function mapYoutube138Details(data: any): Video {
  return mapYoutube138Item(data);
}

export const youtubeApi = {
  fetchHomeVideos,
  fetchHome,
  searchVideos,
  fetchVideoDetails,
  fetchSuggestedVideos,
  fetchStreamingData,
  autoComplete,
  fetchTrending,
  getChannelDetails,
  getChannelDetailsV2,
  getChannelVideos,
  getChannelVideosPage,
  getChannelPlaylists,
  getChannelCommunity,
  getChannelChannels,
  channelSearch,
  getVideoComments,
  getPlaylistDetails,
  getPlaylistVideos,
  getCommunityPostDetails,
  getCommunityPostComments,
  getVideoDetailsV2,
};

export type YoutubeApi = typeof youtubeApi;
