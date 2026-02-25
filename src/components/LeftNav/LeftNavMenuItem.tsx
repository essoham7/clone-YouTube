import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLayout } from '../../context/LayoutContext'

type Props = {
  to: string
  icon: ReactNode
  label: string
}

export default function LeftNavMenuItem({ to, icon, label }: Props) {
  const location = useLocation()
  const active = location.pathname === to
  const { sidebarCollapsed } = useLayout()
  return (
    <Link
      to={to}
      className={`flex items-center ${sidebarCollapsed ? 'justify-center' : ''} gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-white/10 ${active ? 'bg-white/15 font-medium' : ''}`}
    >
      <span className="inline-flex h-6 w-6 items-center justify-center">{icon}</span>
      {sidebarCollapsed ? null : <span className="truncate">{label}</span>}
    </Link>
  )
}
