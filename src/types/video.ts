export type Thumbnail = {
  url: string
  width: number
  height: number
}

export type Channel = {
  id: string
  title: string
  thumbnails?: Thumbnail[]
}

export type VideoStatistics = {
  viewCount?: number
  likeCount?: number
}

export type Video = {
  id: string
  title: string
  description?: string
  publishedAt?: string
  channel: Channel
  thumbnails: Thumbnail[]
  statistics?: VideoStatistics
}

export type PaginatedResponse<T> = {
  items: T[]
  nextPageToken?: string
}
