export default function Footer() {
  const link =
    'text-sm text-muted-foreground transition-colors hover:text-foreground'

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} storeproof
        </p>
        <div className="flex gap-6">
          <a href="#about" className={link}>
            About
          </a>
          <button type="button" className={link}>
            Sign in
          </button>
          <button type="button" className={link}>
            Sign up
          </button>
        </div>
      </div>
    </footer>
  )
}
