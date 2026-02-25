import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Video } from '../types/video'

type VideoState = {
  query: string
  setQuery: (q: string) => void
  results: Video[]
  setResults: (v: Video[]) => void
  loading: boolean
  setLoading: (b: boolean) => void
  error?: string
  setError: (e?: string) => void
}

const Ctx = createContext<VideoState | undefined>(undefined)

export function VideoProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Video[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const value = useMemo(
    () => ({ query, setQuery, results, setResults, loading, setLoading, error, setError }),
    [query, results, loading, error],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useVideoState() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useVideoState must be used within VideoProvider')
  return ctx
}
