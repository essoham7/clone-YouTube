import type { FormEvent } from 'react'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ytLogo from '../../assets/yt-logo.png'
import ytLogoMobile from '../../assets/yt-logo-mobile.png'
import { Menu, Search, Video, Bell, Mic } from 'lucide-react'
import { useLayout } from '../../context/LayoutContext'
import { youtubeApi } from '../../services/youtubeApi'

export default function Header() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const { toggleSidebar, setMobileMenuOpen } = useLayout()
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function debounced(val: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(async () => {
      const q = val.trim()
      if (q.length < 2) {
        setSuggestions([])
        setOpen(false)
        return
      }
      try {
        const res = await youtubeApi.autoComplete(q)
        setSuggestions(res.slice(0, 8))
        setOpen(true)
      } catch {
        setSuggestions([])
        setOpen(false)
      }
    }, 250)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const query = q.trim()
    if (query) navigate(`/search/${encodeURIComponent(query)}`)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0f0f0f] text-white">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              toggleSidebar()
              setMobileMenuOpen(true)
            }}
            className="rounded-full p-2 hover:bg-white/10"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link to="/" className="flex items-center gap-1">
            <div className="relative flex items-center justify-center">
               <img src={ytLogo} alt="YouTube" className="h-5 object-contain hidden md:block" /> 
               <img src={ytLogoMobile} alt="YouTube" className="h-6 object-contain md:hidden" />
            </div>
          </Link>
        </div>
        
        {/* Search Bar (Centered) */}
        <form onSubmit={onSubmit} className="hidden flex-1 max-w-[600px] items-center ml-10 md:flex">
          <div className="relative flex w-full">
            <div className="flex w-full rounded-l-full border border-[#303030] bg-[#121212] overflow-hidden focus-within:border-blue-500 ml-8">
              <div className="pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 hidden group-focus-within:block" />
              </div>
              <input
                value={q}
                onChange={(e) => {
                  const v = e.target.value
                  setQ(v)
                  debounced(v)
                }}
                onFocus={() => suggestions.length > 0 && setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
                placeholder="Rechercher"
                className="w-full bg-transparent px-4 py-2 outline-none text-white placeholder-gray-400"
              />
            </div>
            <button className="w-16 bg-[#222222] border border-l-0 border-[#303030] rounded-r-full flex items-center justify-center hover:bg-[#303030]">
               <Search className="h-5 w-5 text-gray-200" />
            </button>
            
            {open && suggestions.length > 0 && (
              <div className="absolute left-8 right-0 top-full mt-1 z-50 overflow-hidden rounded-xl bg-[#212121] py-2 shadow-xl border border-white/10">
                {suggestions.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onMouseDown={() => {
                      setQ(s)
                      setOpen(false)
                      navigate(`/search/${encodeURIComponent(s)}`)
                    }}
                    className="flex w-full items-center gap-3 px-4 py-1.5 text-left text-white hover:bg-white/10"
                  >
                    <Search className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{s}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button type="button" className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#181818] hover:bg-[#303030]">
             <Mic className="h-5 w-5 text-white" />
          </button>
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-2">
           <button className="hidden md:flex items-center gap-2 rounded-full hover:bg-white/10 p-2">
             <Video className="h-6 w-6" />
           </button>
           <button className="hidden md:flex items-center gap-2 rounded-full hover:bg-white/10 p-2">
             <Bell className="h-6 w-6" />
           </button>
           <button className="flex items-center gap-2 rounded-full hover:bg-white/10 p-2 ml-2">
             <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-medium">L</div>
           </button>
        </div>
      </div>
    </header>
  )
}
