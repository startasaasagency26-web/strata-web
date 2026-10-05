import { Link } from "react-router-dom";
import { LegalPage } from "../components/LegalPage";
import { CONTACT } from "../config/contact";
import { LEGAL } from "../config/legal";
import { routeMetadata } from "../config/routeMetadata";

const Email = () => <a href={CONTACT.mailto}>{CONTACT.email}</a>;

export const Terms = () => (
  <LegalPage
    meta={routeMetadata.terms}
    eyebrow="Legal"
    title="Terms of Use"
    lastUpdated={LEGAL.lastUpdated}
    lastUpdatedIso={LEGAL.lastUpdatedIso}
  >
    <p>
      These terms cover your use of this website, our done-for-you services and {LEGAL.kit.name}. By using
      the site or buying from us, you agree to them. If anything here is unclear, email <Email /> and ask.
    </p>

    <h2>Who we are</h2>
    <p>
      <strong>{LEGAL.businessName}</strong> (“Strata”, “we”, “us”) is a business registered in Malaysia
      under the {LEGAL.registrationAct}, registration number {LEGAL.registrationNumber}. You can reach us at{" "}
      <Email />.
    </p>

    <h2>Using this website</h2>
    <p>
      The site describes what we do. We work to keep it accurate, but it is general information, not advice
      for your particular business, and it may change without notice. Please do not misuse the site, try to
      break it, or copy it wholesale. Links to other sites, such as WhatsApp or Gumroad, are there for
      convenience; those sites have their own terms and we are not responsible for them.
    </p>

    <h2>Our services</h2>
    <p>
      We run Business Operations Audits and scoped workflow implementation for small and growing service
      businesses, done for you. Nothing on this website is a binding offer. Every engagement is agreed in
      writing first, with its own scope, price and terms. If that agreement and these terms disagree, the
      agreement wins.
    </p>

    <h2>{LEGAL.kit.name}</h2>
    <p>
      {LEGAL.kit.name} is a digital product: fillable PDF workbooks in A4 and US Letter. It is sold and
      delivered through <a href={LEGAL.kit.gumroadUrl} target="_blank" rel="noreferrer">Gumroad</a>, which
      handles the checkout and processes your payment as the merchant. Gumroad’s terms also apply to the
      purchase. We never see your card details.
    </p>
    <p>
      When you buy the kit, you may use it for yourself and your own business: fill it in, print it, and
      make copies for people who work in that business. You may not resell it, share or publish the files,
      or repackage the content as your own product.
    </p>

    <h2>Refunds</h2>
    <p>
      If the kit is not useful to you, ask within <strong>{LEGAL.kit.refundDays} days</strong> of buying it
      and you will get a full refund. Email <Email /> from the address you bought with, or request it through
      Gumroad. This does not reduce any rights you have under the consumer law where you live.
    </p>
    <p>Refunds for services follow the written agreement for that engagement.</p>

    <h2>Not professional advice</h2>
    <p>
      The kit and the content on this site help you think through how your business runs. They are not
      legal, financial, tax or other professional advice, and the results depend on how you use them. The
      worked example in the kit is a made-up business and does not promise any result.
    </p>

    <h2>Ownership</h2>
    <p>
      The website, the kit and everything in them, including text, design and the Strata name and logo,
      belong to Strata or are used with permission. Buying the kit gives you the right to use it as described
      above; it does not transfer ownership.
    </p>

    <h2>Liability</h2>
    <p>
      The site and the kit are provided as they are. As far as the law allows, we are not liable for indirect
      or consequential losses, such as lost profit or lost data, arising from using them. For the kit, our
      total liability to you is limited to what you paid for it. For services, liability is set by the
      engagement agreement. Nothing in these terms limits liability that cannot be limited by law.
    </p>

    <h2>Changes to these terms</h2>
    <p>
      We may update these terms. The date at the top shows when they last changed. The version that applied
      when you bought something is the one that covers that purchase.
    </p>

    <h2>Governing law</h2>
    <p>
      These terms are governed by the laws of Malaysia, and the courts of Malaysia can hear any dispute. If
      you are a consumer living elsewhere, you keep any protections the law of your own country gives you.
      Most problems are solved faster by email, so please write to us first.
    </p>

    <h2>Privacy</h2>
    <p>
      How we handle personal information is explained in our <Link to="/privacy">Privacy Policy</Link>.
    </p>

    <h2>Contact</h2>
    <p>
      {LEGAL.businessName}, registration number {LEGAL.registrationNumber}. Email <Email />.
    </p>
  </LegalPage>
);
