import { Link } from "react-router-dom";
import { LegalPage } from "../components/LegalPage";
import { CONTACT } from "../config/contact";
import { LEGAL } from "../config/legal";
import { routeMetadata } from "../config/routeMetadata";

const Email = () => <a href={CONTACT.mailto}>{CONTACT.email}</a>;

export const Privacy = () => (
  <LegalPage
    meta={routeMetadata.privacy}
    eyebrow="Legal"
    title="Privacy Policy"
    lastUpdated={LEGAL.lastUpdated}
    lastUpdatedIso={LEGAL.lastUpdatedIso}
  >
    <p>
      This policy explains what personal information we collect, why, who handles it for us, and what you
      can ask us to do with it. We have tried to keep it short and plain.
    </p>

    <h2>Who we are</h2>
    <p>
      This website is run by <strong>{LEGAL.businessName}</strong> (“Strata”, “we”, “us”), a business
      registered in Malaysia under the {LEGAL.registrationAct}, registration number{" "}
      {LEGAL.registrationNumber}. We are responsible for the personal information described here. For
      anything about privacy, email <Email />.
    </p>

    <h2>The short version</h2>
    <ul>
      <li>There are no forms or accounts on this website. You do not give us anything just by browsing.</li>
      <li>We do not set cookies, and we do not use advertising or social media tracking pixels.</li>
      <li>We count visits with privacy-friendly analytics that do not identify you.</li>
      <li>If you email us, message us on WhatsApp or buy from us, we keep what you send us so we can reply and serve you.</li>
      <li>We do not sell your personal information.</li>
    </ul>

    <h2>What we collect and why</h2>
    <h3>When you browse this website</h3>
    <p>
      The site is hosted by Vercel. Like any web host, Vercel processes technical details such as your IP
      address and browser type to deliver pages and keep the site secure.
    </p>
    <p>
      We use <strong>Vercel Web Analytics</strong> to count page views. It records the page, the site that
      referred you, your approximate location (country or city), and your browser, operating system and
      device type. It does not use cookies. Visits are grouped using a short-lived code worked out from the
      request, which is thrown away after 24 hours, so we cannot identify you or follow you across other
      websites. We also record two anonymous events: when someone opens our WhatsApp contact chooser, and
      when they go on to WhatsApp, along with which button on our site they used.
    </p>
    <p>
      We use <strong>Vercel Speed Insights</strong> to measure how quickly pages load. It records loading
      times along with the page, browser, device type, network speed and country. It is not tied to you or
      your IP address.
    </p>
    <p>We use this only to understand which pages are useful and to keep the site fast.</p>

    <h3>When you contact us</h3>
    <p>
      If you email us or message us on WhatsApp, we receive your name, your email address or phone number,
      and whatever you choose to tell us. We use it to reply, to discuss work with you, and to keep a record
      of the conversation. WhatsApp is run by WhatsApp LLC (part of Meta) under its own privacy policy, and
      starts when you leave our site.
    </p>

    <h3>When you buy {LEGAL.kit.name}</h3>
    <p>
      The kit is sold and delivered through <a href={LEGAL.kit.gumroadUrl} target="_blank" rel="noreferrer">Gumroad</a>,
      which processes your payment as the merchant. <strong>We never see your card details.</strong> Gumroad
      shares with us the details we need to deliver and support your purchase, such as your name, email
      address, what you bought and when. Gumroad’s own privacy policy covers the checkout.
    </p>

    <h3>When you work with us</h3>
    <p>
      If you hire us for a Business Operations Audit or workflow implementation, we handle the business
      information and contact details you share with us to deliver that work. The written proposal or
      agreement for that engagement sets out anything more specific.
    </p>

    <h2>Our legal basis</h2>
    <p>If you are in the European Union or the United Kingdom, we rely on these grounds:</p>
    <ul>
      <li><strong>Contract</strong>: to deliver a purchase or an engagement, or to take steps you ask for before one, such as answering an enquiry.</li>
      <li><strong>Legitimate interests</strong>: to run, secure and improve the website using anonymous analytics, and to keep business records.</li>
      <li><strong>Legal obligation</strong>: to keep the tax and accounting records the law requires.</li>
      <li><strong>Consent</strong>: where we ask for it. You can withdraw consent at any time.</li>
    </ul>

    <h2>Cookies</h2>
    <p>
      This website does not set cookies. If you click through to WhatsApp, Gumroad or another site, that
      site may set its own cookies under its own policy.
    </p>

    <h2>Who we share it with</h2>
    <p>We share personal information only with the services we use to run the business:</p>
    <ul>
      <li><strong>Vercel</strong>: website hosting, analytics and speed measurement.</li>
      <li><strong>Gumroad</strong>: selling and delivering {LEGAL.kit.name}.</li>
      <li><strong>Our email provider and WhatsApp</strong>: so we can talk to you.</li>
    </ul>
    <p>
      We may also disclose information if the law requires it. We do not sell personal information, and we
      do not share it with anyone for targeted advertising.
    </p>

    <h2>International transfers</h2>
    <p>
      We are based in Malaysia, and the services above run in the United States and elsewhere, so your
      information may be processed outside your own country. Where the law requires it, we rely on the
      safeguards those providers put in place for international transfers.
    </p>

    <h2>How long we keep it</h2>
    <p>
      We keep conversations and enquiries for as long as they are useful for working with you, then delete
      them. Purchase and client records are kept for as long as tax and accounting law requires. Analytics
      are anonymous and kept only as aggregate numbers.
    </p>

    <h2>Your rights</h2>
    <p>Wherever you are, you can ask us to:</p>
    <ul>
      <li>tell you what personal information we hold about you and give you a copy;</li>
      <li>correct anything that is wrong;</li>
      <li>delete it, unless we have to keep it by law;</li>
      <li>stop or limit how we use it, including object to any use based on legitimate interests;</li>
      <li>stop contacting you.</li>
    </ul>
    <p>
      Email <Email /> to make a request. We will reply within 21 days, and we may ask you to confirm who you
      are first. These requests are free.
    </p>
    <p>
      In Malaysia these rights come from the Personal Data Protection Act 2010; in the European Union and
      the United Kingdom, from the GDPR and UK GDPR. If you are unhappy with how we have handled your
      information, please tell us first. You can also complain to your local data protection authority (in
      Malaysia, the Personal Data Protection Commissioner).
    </p>

    <h2>Security</h2>
    <p>
      We use reputable providers and take reasonable care to protect what we hold. No system is perfectly
      secure, so we cannot promise that information will never be exposed, but we will act quickly and tell
      you if something goes wrong that affects you.
    </p>

    <h2>Children</h2>
    <p>
      This website and our products are meant for business owners and adults. They are not aimed at anyone
      under 18, and we do not knowingly collect their information.
    </p>

    <h2>Changes to this policy</h2>
    <p>
      If what we collect changes, we will update this page and the date at the top. Our{" "}
      <Link to="/terms">Terms of Use</Link> cover the rest of how the site and our products work.
    </p>

    <h2>Contact</h2>
    <p>
      {LEGAL.businessName}, registration number {LEGAL.registrationNumber}. Email <Email />.
    </p>
  </LegalPage>
);
