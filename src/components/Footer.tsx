export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center sm:px-6 sm:py-10">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} storeproof
        </p>
      </div>
    </footer>
  )
}
