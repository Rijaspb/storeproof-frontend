import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/40 backdrop-blur-md backdrop-saturate-150">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link to="/home" className="text-lg font-semibold tracking-tight">
          storeproof
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 sm:flex">
          <a
            href="#about"
            className="px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </a>
          <Button variant="ghost" size="lg">
            Sign in
          </Button>
          <Button size="lg">Sign up</Button>
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon-lg"
          className="sm:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          id="mobile-menu"
          className="flex flex-col items-center border-t border-border/40 bg-background/95 px-4 pb-4 text-center sm:hidden"
        >
          <a
            href="#about"
            onClick={close}
            className="block w-full py-3 text-center text-base text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </a>
          <div className="mt-1 flex w-full flex-col items-center gap-2">
            <Button
              variant="outline"
              size="lg"
              className="h-11 w-full text-base"
              onClick={close}
            >
              Sign in
            </Button>
            <Button size="lg" className="h-11 w-full text-base" onClick={close}>
              Sign up
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
