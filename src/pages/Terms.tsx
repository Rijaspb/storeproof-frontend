import { Link } from 'react-router'
import LegalPage, { LegalSection } from '@/components/LegalPage'

const list = 'list-disc space-y-1.5 pl-5'

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" updated="2 October 2026">
      <p className="mt-6 text-lg text-muted-foreground">
        These terms govern your use of StoreProof. By creating an account you agree to
        them. If you don't agree, please don't use the service.
      </p>

      <LegalSection title="What StoreProof does">
        <p>
          StoreProof helps shop owners record incidents and gather CCTV footage of the
          people involved in one place, so it can be reviewed and shared with the police.
          StoreProof gathers footage; it does not decide what happened or accuse anyone.
          You review the material and decide what to do with it.
        </p>
      </LegalSection>

      <LegalSection title="Your account">
        <ul className={list}>
          <li>You must give accurate details and keep your password secure.</li>
          <li>You're responsible for everything done through your account.</li>
          <li>
            Tell us straight away if you think someone else has accessed it.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Your content and footage">
        <p>
          You keep ownership of the incident reports and footage you add. You give us
          permission to store and process them only so we can provide the service to you.
        </p>
        <p>You confirm that:</p>
        <ul className={list}>
          <li>you have the right to use the cameras and footage you give us;</li>
          <li>
            your CCTV use follows the law, including data protection law, with proper
            signage and any registration required;
          </li>
          <li>
            what you write in reports is true to the best of your knowledge, and you won't
            use it to harass or defame anyone.
          </li>
        </ul>
        <p>
          How we handle personal data is explained in our{' '}
          <Link to="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <p>You agree not to:</p>
        <ul className={list}>
          <li>use StoreProof for anything unlawful, or to monitor people unfairly;</li>
          <li>upload footage you aren't entitled to use;</li>
          <li>try to access other users' data or disrupt the service;</li>
          <li>copy, resell or reverse-engineer the service.</li>
        </ul>
        <p>We may suspend accounts that break these rules.</p>
      </LegalSection>

      <LegalSection title="Sharing with the police">
        <p>
          You choose what to share and with whom. Nothing is sent to the police for you.
          The status of an incident and any police link you add are records you keep for
          your own use. We don't guarantee any outcome of a police investigation.
        </p>
      </LegalSection>

      <LegalSection title="The pilot">
        <p>
          StoreProof is in a pilot stage. Features may change, be removed or occasionally
          be unavailable, and we may fix problems without notice. Please keep your own
          copies of anything you can't afford to lose.
        </p>
      </LegalSection>

      <LegalSection title="Our responsibility">
        <p>
          We take care to provide the service, but we provide it "as is". StoreProof may
          miss footage or make mistakes, so you should always review the material
          yourself before relying on it. To the extent the law allows, we are not liable
          for indirect or lost profits, or for outcomes that depend on decisions you or
          the police make. Nothing here limits liability that cannot lawfully be limited,
          such as for death or personal injury caused by negligence, or for fraud.
        </p>
      </LegalSection>

      <LegalSection title="Ending your account">
        <p>
          You can stop using StoreProof at any time and ask us to delete your account and
          data. We may suspend or close accounts that break these terms. What happens to
          your data afterwards is set out in the{' '}
          <Link to="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Changes and governing law">
        <p>
          We may update these terms; if the change matters, we'll tell you and update the
          date above. Continuing to use StoreProof means you accept the new terms. These
          terms are governed by the law of Scotland, and the Scottish courts have
          jurisdiction.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions? Email{' '}
          <a href="mailto:rijaspb@gmail.com" className="underline">
            rijaspb@gmail.com
          </a>{' '}
          or use the <Link to="/contact" className="underline">contact page</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
