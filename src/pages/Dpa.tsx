import { Link } from 'react-router'
import LegalPage, { LegalSection } from '@/components/LegalPage'

const list = 'list-disc space-y-1.5 pl-5'

export default function Dpa() {
  return (
    <LegalPage title="Data Processing Agreement" updated="3 October 2026">
      <p className="mt-6 text-lg text-muted-foreground">
        This agreement applies when StoreProof ("we", the processor) handles personal
        data on behalf of a shop owner ("you", the controller) through the service. It
        forms part of our <Link to="/terms" className="underline">Terms of Service</Link>{' '}
        and is made under Article 28 of the UK GDPR. By accepting the Terms, you accept
        this agreement.
      </p>

      <LegalSection title="1. Roles">
        <p>
          For the incident reports and CCTV footage you add, you are the controller and
          we are the processor. For your account details, we are the controller, as
          explained in our <Link to="/privacy" className="underline">Privacy Policy</Link>.
          This agreement covers only the first kind.
        </p>
      </LegalSection>

      <LegalSection title="2. What we process, and why">
        <ul className={list}>
          <li>
            <strong className="text-foreground">Subject matter and purpose:</strong>{' '}
            storing your incident reports and footage, and gathering footage of the
            people involved in an incident you report, so you can review it and share it
            with the police.
          </li>
          <li>
            <strong className="text-foreground">Duration:</strong> for as long as you
            use the service, until you delete the data or close your account.
          </li>
          <li>
            <strong className="text-foreground">Types of data:</strong> CCTV footage,
            descriptions of people, incident details, notes, dates and times, and links
            to police cases. This can include data about suspected criminal offences.
          </li>
          <li>
            <strong className="text-foreground">People affected:</strong> customers,
            suspected offenders, staff, and anyone else who appears in your footage or
            reports.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. What we promise to do">
        <p>We will:</p>
        <ul className={list}>
          <li>
            process the data only on your documented instructions, which are these terms
            and your use of the service, unless the law requires otherwise (in which case
            we'll tell you first, unless the law forbids it);
          </li>
          <li>tell you if we think an instruction breaks data protection law;</li>
          <li>
            make sure everyone who can access the data is bound by confidentiality;
          </li>
          <li>
            keep the data secure with appropriate technical and organisational measures,
            including access limited to your own account and encrypted connections;
          </li>
          <li>
            help you respond to requests from people exercising their rights, and with
            your own security, breach and impact-assessment duties, taking into account
            the information we hold;
          </li>
          <li>
            tell you without undue delay after we become aware of a personal data breach
            affecting your data;
          </li>
          <li>
            delete or return your data when you ask, or when your account ends, unless
            the law requires us to keep it; and
          </li>
          <li>
            give you the information you reasonably need to check we're following this
            agreement, and allow reasonable audits with notice.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Sub-processors">
        <p>
          You agree that we may use the following sub-processors, and we have a contract
          with each that requires the same level of data protection as this agreement:
        </p>
        <ul className={list}>
          <li>
            <strong className="text-foreground">Supabase</strong>: sign-in and our
            database.
          </li>
          <li>
            <strong className="text-foreground">Our cloud storage provider</strong>:
            storage of video files.
          </li>
        </ul>
        <p>
          If we add or replace a sub-processor, we'll tell you in advance so you can
          object. If you object and we can't reasonably accommodate you, you can close
          your account. We remain responsible for our sub-processors.
        </p>
      </LegalSection>

      <LegalSection title="5. Transfers outside the UK">
        <p>
          If data is transferred outside the UK, we make sure an approved safeguard is in
          place, such as an adequacy decision or the UK International Data Transfer
          Agreement or Addendum.
        </p>
      </LegalSection>

      <LegalSection title="6. Your responsibilities as controller">
        <p>You are responsible for:</p>
        <ul className={list}>
          <li>
            having a lawful basis for recording and using the footage and reports, and
            for any criminal-offence data they include;
          </li>
          <li>
            CCTV signage, telling people how their data is used, and registering with the
            ICO and paying the data protection fee if you are required to;
          </li>
          <li>only adding data you need, and deleting it when you no longer need it; and</li>
          <li>
            deciding who you share footage with, such as the police. We don't share it
            for you.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Liability and changes">
        <p>
          Liability under this agreement is subject to the limits in our{' '}
          <Link to="/terms" className="underline">Terms of Service</Link>. We may update
          this agreement if the law or our service changes; if the change matters, we'll
          tell you and update the date above.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about this agreement? Email{' '}
          <a href="mailto:rijaspb@gmail.com" className="underline">
            rijaspb@gmail.com
          </a>{' '}
          or use the <Link to="/contact" className="underline">contact page</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
