import { useState } from 'react'
import { LogOut, Menu, Plus, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

interface DashboardNavbarProps {
  onNewForm?: () => void
}

export default function DashboardNavbar({ onNewForm }: DashboardNavbarProps) {
  const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const navigate = useNavigate()

  const logout = async () => {
    setLoggingOut(true)
    await supabase.auth.signOut()
    navigate('/signin', { replace: true })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/40 backdrop-blur-md backdrop-saturate-150">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link to="/dashboard" className="text-lg font-semibold tracking-tight">
          storeproof
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-2 sm:flex">
          {onNewForm && (
            <Button size="lg" onClick={onNewForm}>
              <Plus /> New form
            </Button>
          )}
          <Button variant="ghost" size="lg" onClick={logout} disabled={loggingOut}>
            <LogOut /> {loggingOut ? 'Logging out…' : 'Log out'}
          </Button>
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon-lg"
          className="sm:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="dashboard-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          id="dashboard-mobile-menu"
          className="flex flex-col gap-2 border-t border-border/40 bg-background/95 px-4 py-4 sm:hidden"
        >
          {onNewForm && (
            <Button
              size="lg"
              className="h-11 w-full text-base"
              onClick={() => {
                setOpen(false)
                onNewForm()
              }}
            >
              <Plus /> New form
            </Button>
          )}
          <Button
            variant="outline"
            size="lg"
            className="h-11 w-full text-base"
            onClick={logout}
            disabled={loggingOut}
          >
            <LogOut /> {loggingOut ? 'Logging out…' : 'Log out'}
          </Button>
        </div>
      )}
    </header>
  )
}
