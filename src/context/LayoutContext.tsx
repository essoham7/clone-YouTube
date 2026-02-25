import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

type LayoutState = {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (v: boolean) => void
}

const Ctx = createContext<LayoutState | undefined>(undefined)

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const value = useMemo(
    () => ({
      sidebarCollapsed,
      mobileMenuOpen,
      toggleSidebar: () => setSidebarCollapsed((v) => !v),
      setMobileMenuOpen,
    }),
    [sidebarCollapsed, mobileMenuOpen],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLayout() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLayout must be used within LayoutProvider')
  return ctx
}
