import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <header className="border-b border-border">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/home" className="text-lg font-semibold tracking-tight">
          storeproof
        </Link>

        <div className="flex items-center gap-1">
          <a
            href="#about"
            className="hidden px-3 text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            About
          </a>
          <Button variant="ghost" size="lg">
            Sign in
          </Button>
          <Button size="lg">Sign up</Button>
        </div>
      </nav>
    </header>
  )
}
