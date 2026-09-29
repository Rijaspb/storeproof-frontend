import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />

      <main className="relative flex w-full flex-1 flex-col justify-center overflow-hidden">
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          src="/hero_bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 -z-10 bg-background/70" />
        <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <h1 className="max-w-4xl text-[clamp(2.25rem,6vw,4.75rem)] leading-[1] font-semibold tracking-tighter">
          A £10 theft shouldn't cost you two hours of CCTV.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
          Your staff log what they saw while it's fresh. StoreProof finds the person in your footage, follows them from entry to exit, and hands you a timeline ready for Police Scotland. No rewinding, and no details lost between the shop floor and the office.
        </p>
        <div className="mt-10 flex gap-3">
          <Button size="lg" className="h-11 px-6 text-base">
            Join the pilot
          </Button>
          <Button size="lg" variant="outline" className="h-11 px-6 text-base">
            See how it works
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          For independent convenience stores. Works with your existing cameras.
        </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
