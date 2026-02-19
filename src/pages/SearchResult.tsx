import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { youtubeApi } from '../services/youtubeApi'
import type { Video } from '../types/video'
import SearchResultVideo from '../components/SearchResultVideo'

export default function SearchResult() {
  const { query = '' } = useParams<{ query: string }>()
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!query) return
    let active = true
    // setLoading(true)
    youtubeApi
      .searchVideos(query)
      .then((res) => {
        if (active) setVideos(res.items)
      })
      .catch((e) => setError(e?.message ?? 'Erreur lors de la recherche'))
      .finally(() => setLoading(false))
    return () => {
      active = false
    }
  }, [query])

  if (loading) return <div className="p-6 text-center">Recherche…</div>
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>

  return (
    <div className="flex flex-col gap-4 p-6">
      {videos.map((v) => (
        <SearchResultVideo key={v.id} video={v} />
      ))}
    </div>
  )
}
