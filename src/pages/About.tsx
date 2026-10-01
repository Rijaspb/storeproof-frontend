import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const beliefs = [
  {
    title: 'All of it, not bits of it.',
    body: 'StoreProof saves the footage from every camera that caught the person, covering their whole visit, so nothing important gets left behind.',
  },
  {
    title: 'You stay in charge.',
    body: "StoreProof gathers the footage. It doesn't accuse anyone. You watch it, decide what happened, and choose what to share.",
  },
  {
    title: 'Your footage stays yours.',
    body: 'We only process the footage for the incident you report, and nothing is shared without your say-so.',
  },
]

export default function About() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-14 sm:pt-16">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <header>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              About StoreProof
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              StoreProof finds every camera that caught someone in your shop and
              saves their footage in one place, from the moment they walk in to
              the moment they leave, ready to hand to the police.
            </p>
          </header>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">
              Why this exists
            </h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                When something goes wrong in a convenience store, the footage is
                usually there. The hard part is everything after that.
              </p>
              <p>
                Someone has to sit down after a long shift and scroll through
                hours of video across several cameras, trying to work out which
                ones caught the person and when. Most shop owners don't have a
                security team to do this. They have a shop to run.
              </p>
              <p>
                I built StoreProof because that job shouldn't fall on the person
                who's already been stolen from.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">
              Who it's for
            </h2>
            <p className="mt-4 text-muted-foreground">
              StoreProof is built for independent convenience stores, corner
              shops and off-licences in Scotland: owner-run businesses with a
              CCTV system already in place and no time to become video analysts.
              If you've ever been asked by the police for "the footage" and
              wondered where to even start, this is for you.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">
              What we believe
            </h2>
            <ul className="mt-4 space-y-4">
              {beliefs.map((b) => (
                <li
                  key={b.title}
                  className="rounded-lg border border-border p-4 sm:p-5"
                >
                  <h3 className="font-medium">{b.title}</h3>
                  <p className="mt-1 text-muted-foreground">{b.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">
              Who's behind it
            </h2>
            <p className="mt-4 font-medium">
              Rijas Panthayil Baby Suresh,{' '}
              <span className="text-muted-foreground">Founder</span>
            </p>
            <p className="mt-2 text-muted-foreground">
              I'm a full-stack developer based in Paisley. I came to Scotland
              from Kerala, India, and hold an MSc in Business Analytics from the
              University of Dundee. I build StoreProof full-time, and every
              feature starts with a conversation with a shop owner.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">
              Where we are
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                Part of Techscaler's Catalyst accelerator programme (Autumn 2026
                cohort)
              </li>
              <li>
                Built around Police Scotland's digital evidence submission
                process
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
