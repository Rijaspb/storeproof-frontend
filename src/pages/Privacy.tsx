import { Link } from 'react-router'
import LegalPage, { LegalSection } from '@/components/LegalPage'

const list = 'list-disc space-y-1.5 pl-5'

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="2 October 2026">
      <p className="mt-6 text-lg text-muted-foreground">
        This policy explains what personal data StoreProof collects, why, who we share it
        with, and the choices you have. StoreProof is based in Glasgow, Scotland, and we
        follow UK data protection law (UK GDPR and the Data Protection Act 2018).
      </p>

      <LegalSection title="Who is responsible for your data">
        <p>
          There are two kinds of data, and our role differs for each:
        </p>
        <ul className={list}>
          <li>
            <strong className="text-foreground">Your account data</strong> (your name,
            email and so on): StoreProof is the controller.
          </li>
          <li>
            <strong className="text-foreground">Incident reports and footage</strong>{' '}
            about people in your shop: you are the controller and StoreProof is your
            processor. We only handle this data on your instructions, to provide the
            service, as set out in our{' '}
            <Link to="/dpa" className="underline">Data Processing Agreement</Link>. You
            decide what to record and what to share.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="What we collect">
        <p className="font-medium text-foreground">Account</p>
        <ul className={list}>
          <li>Full name, email address and password. Passwords are never stored in plain text.</li>
          <li>Store or business name, if you give one.</li>
        </ul>

        <p className="font-medium text-foreground">Incident reports you create</p>
        <ul className={list}>
          <li>The date and time of the incident.</li>
          <li>
            Free-text descriptions of the person involved, what happened, and your notes.
            These can describe identifiable people, such as a suspected thief, and may
            relate to suspected criminal offences.
          </li>
          <li>A link to the police case, if you add one, and the incident's status.</li>
          <li>The store the incident belongs to, an incident number, and timestamps.</li>
        </ul>

        <p className="font-medium text-foreground">CCTV footage</p>
        <ul className={list}>
          <li>
            Video clips of the incident, which show the people who appear on your cameras,
            including customers, staff and passers-by.
          </li>
        </ul>

        <p className="font-medium text-foreground">Contact form</p>
        <ul className={list}>
          <li>The name, email address and message you submit.</li>
        </ul>

        <p className="font-medium text-foreground">Technical data</p>
        <ul className={list}>
          <li>
            A sign-in session stored in your browser so you stay signed in. We don't use
            advertising or analytics cookies or trackers.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Why we use it, and our legal basis">
        <ul className={list}>
          <li>
            To create your account, sign you in and run the service for you (performance
            of our contract with you).
          </li>
          <li>
            To find and save footage of an incident you report and keep your reports in
            one place (on your instructions, as your processor).
          </li>
          <li>
            To reply to your messages and provide support (our legitimate interest in
            running the business, and responding to your request).
          </li>
          <li>
            To keep the service secure and prevent misuse (legitimate interests).
          </li>
        </ul>
        <p>
          We don't sell personal data, use it for advertising, or use your footage to
          identify people for any purpose other than the incident you report.
        </p>
      </LegalSection>

      <LegalSection title="Your responsibilities as a shop owner">
        <p>
          Because you decide what goes into a report and who sees it, you are responsible
          for having a lawful reason to record and use it. In practice that means
          displaying CCTV signage, registering with the ICO if you need to, keeping only
          what you need, and sharing footage only with those who should have it, such as
          the police.
        </p>
      </LegalSection>

      <LegalSection title="Who we share it with">
        <p>
          We use trusted providers to run StoreProof. They process data only on our
          instructions:
        </p>
        <ul className={list}>
          <li>
            <strong className="text-foreground">Supabase</strong>: sign-in and our
            database.
          </li>
          <li>
            <strong className="text-foreground">Cloud storage</strong>: secure storage
            for video files.
          </li>
        </ul>
        <p>
          Nothing is shared with the police or anyone else unless you choose to share it,
          or the law requires us to. Where a provider is outside the UK, we rely on
          approved safeguards for the transfer.
        </p>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          We keep account data while your account is open. Incident reports and footage
          are kept until you delete them or close your account, so you can decide how
          long you need them. You should not keep footage longer than you have a reason to.
          After deletion, copies may remain in backups for a short period before they are
          removed.
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          Your data is accessed only through your signed-in account, and each shop can
          see only its own incidents and footage. No system is perfectly secure, so please
          use a strong, unique password.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          You can ask us to access, correct, delete or export your personal data, to
          restrict or object to how we use it, and to withdraw consent where we rely on
          it. People who appear in footage can make these requests too; if the request
          concerns a shop's footage, we'll pass it to that shop as the controller.
        </p>
        <p>
          To use any of these rights, <Link to="/contact" className="underline">contact us</Link>.
          If you're unhappy with how we've handled your data, you can complain to the
          Information Commissioner's Office at{' '}
          <a
            href="https://ico.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            ico.org.uk
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          If we change this policy in a way that matters, we'll update the date above and
          tell you through the service or by email.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about privacy? Email{' '}
          <a href="mailto:rijaspb@gmail.com" className="underline">
            rijaspb@gmail.com
          </a>{' '}
          or use the <Link to="/contact" className="underline">contact page</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
