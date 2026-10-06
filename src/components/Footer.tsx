import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6 sm:py-10">
        <p>© {new Date().getFullYear()} storeproof</p>
        <nav aria-label="Footer" className="flex gap-4">
          <Link to="/terms" className="hover:text-foreground">Terms</Link>
          <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link to="/dpa" className="hover:text-foreground">DPA</Link>
        </nav>
      </div>
    </footer>
  )
}
