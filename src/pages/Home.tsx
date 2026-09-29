import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-24">
        <h1 className="max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] font-semibold tracking-tighter">
          Know a store is real before you buy.
        </h1>
        <p className="mt-8 max-w-md text-lg text-muted-foreground">
          storeproof checks online stores so you can shop with confidence.
        </p>
        <div className="mt-10 flex gap-3">
          <Button size="lg" className="h-11 px-6 text-base">
            Get started
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
