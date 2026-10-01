import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative flex w-full flex-1 flex-col justify-center overflow-hidden">
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        src="/hero_bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 -z-10 bg-background/70" />
      <div className="mx-auto w-full max-w-6xl px-4 pt-28 pb-16 sm:px-6 sm:py-24">
        <h1 className="max-w-4xl text-[clamp(2rem,8vw,4.75rem)] leading-[1.05] font-semibold tracking-tighter text-balance">
          A £10 theft shouldn't cost you two hours of CCTV.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:mt-8 sm:text-lg">
          Your staff log what they saw while it's fresh. StoreProof finds the person in your footage, follows them from entry to exit, and hands you a timeline ready for Police Scotland. No rewinding, and no details lost between the shop floor and the office.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
          <Button size="lg" className="h-12 w-full px-6 text-base sm:h-11 sm:w-auto">
            Join the pilot
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 w-full px-6 text-base sm:h-11 sm:w-auto"
          >
            See how it works
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          For independent convenience stores. Works with your existing cameras.
        </p>
      </div>
    </section>
  )
}
