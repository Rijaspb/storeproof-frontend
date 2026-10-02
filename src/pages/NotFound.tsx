import { Link } from 'react-router'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex flex-1 items-center pt-14 sm:pt-16">
        <div className="mx-auto max-w-md px-4 py-12 text-center sm:px-6 sm:py-16">
          <p className="text-sm text-muted-foreground">404</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Page not found
          </h1>
          <p className="mt-4 text-muted-foreground">
            The page you're looking for doesn't exist or has moved.
          </p>
          <Button
            size="lg"
            className="mt-8"
            nativeButton={false}
            render={<Link to="/home" />}
          >
            Back to home
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
