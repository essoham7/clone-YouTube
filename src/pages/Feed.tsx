import { useEffect, useState } from 'react'
import { youtubeApi } from '../services/youtubeApi'
import VideoCard from '../components/VideoCard'
import VideoCardSkeleton from '../components/Skeletons/VideoCardSkeleton'
import type { Video } from '../types/video'

export default function Feed() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    let active = true
    // setLoading(true) - already true
    youtubeApi
      .fetchHome()
      .then((res) => {
        if (!active) return
        if (res.items.length > 0) {
          setVideos(res.items)
        } else {
          // Fallback to trending search if home is empty
          return youtubeApi.fetchHomeVideos('trending').then((fallbackRes) => {
            if (active) setVideos(fallbackRes.items)
          })
        }
      })
      .catch((e) => {
        console.error(e)
        setError(e?.message ?? 'Erreur lors du chargement')
      })
      .finally(() => setLoading(false))
    return () => {
      active = false
    }
  }, [])

  if (error) return <div className="p-6 text-center text-red-500">{error}</div>

  return (
    <div className="grid gap-4 p-4 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
      {loading
        ? Array.from({ length: 12 }).map((_, idx) => (
            <VideoCardSkeleton key={idx} />
          ))
        : videos.map((video) => <VideoCard key={video.id} video={video} />)}
    </div>
  )
}
