import Link from "next/link";
import { ArrowLeft, Mail, Scale } from "lucide-react";
import { LegalPage, LegalSection } from "@/components/legal-layout";

export const metadata = {
  title: "Terms of Service",
  description:
    "AlamOps terms of service — the rules that govern access and use of our platform, services and applications.",
};

export default function TermsOfServicePage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const sections = [
    { id: "scope", num: "01", title: "Scope & Purpose" },
    { id: "registration", num: "02", title: "Registration" },
    { id: "data-privacy", num: "03", title: "Data & Privacy" },
    { id: "intellectual-property", num: "04", title: "Intellectual Property" },
    { id: "liability", num: "05", title: "Liability" },
    { id: "billing", num: "06", title: "Billing & Services" },
    { id: "modifications", num: "07", title: "Modifications" },
    { id: "jurisdiction", num: "08", title: "Law & Jurisdiction" },
    { id: "acceptable-use", num: "09", title: "Acceptable Use" },
    { id: "enforcement", num: "10", title: "Enforcement" },
  ];

  return (
    <LegalPage
      kicker="Legal · Terms"
      icon={<Scale className="w-4 h-4" />}
      title={
        <>
          Terms of <span className="italic text-[#5a6a3a]">service.</span>
        </>
      }
      subtitle="AlamOps Consulting · governed by Spanish & EU law"
      updated={currentDate}
      intro="Access and use of our platform, services and applications are subject to these Terms and Conditions. By registering, you confirm that you have read and accepted them."
      sections={sections}
    >
      <LegalSection id="scope" num="01" title="Scope & Purpose">
        <p>
          These terms regulate the relationship between AlamOps Consulting and
          registered users regarding:
        </p>
        <ul>
          <li>Access to the platform and its services</li>
          <li>Use of the resources, tools and content offered</li>
          <li>
            Obligations of both parties regarding security, confidentiality and
            legal compliance
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="registration" num="02" title="Registration & Account">
        <p>
          To access the platform, registration with truthful data is required.
        </p>
        <p>
          Users are responsible for the confidentiality of their credentials
          and any activity performed with them.
        </p>
        <p>
          AlamOps may suspend or delete accounts in case of non-compliance.
        </p>
      </LegalSection>

      <LegalSection
        id="data-privacy"
        num="03"
        title="Data Protection & Privacy"
      >
        <p>We comply with GDPR (EU 2016/679) and applicable regulations.</p>
        <p>
          Your personal data will be used only for service provision,
          commercial relationship management and legal compliance.
        </p>
        <div className="mt-4 border border-[#1a1a17]/15 p-5">
          <p className="mb-3">
            You can exercise your rights (access, rectification, deletion,
            opposition, portability and limitation) by writing to:
          </p>
          <div className="inline-flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#5a6a3a]" />
            <a
              href="mailto:legal@alamops.com"
              className="mono text-sm tracking-tight hover:text-[#5a6a3a] transition-colors"
            >
              legal@alamops.com
            </a>
          </div>
        </div>
      </LegalSection>

      <LegalSection
        id="intellectual-property"
        num="04"
        title="Intellectual Property"
      >
        <p>
          All content, software, templates, documentation and trademarks are
          property of AlamOps Consulting or their licensed owners.
        </p>
        <p>
          Copying, distribution, modification or exploitation without express
          authorization is not permitted.
        </p>
      </LegalSection>

      <LegalSection id="liability" num="05" title="Liability">
        <p>
          AlamOps commits to applying necessary security and availability
          measures but does not guarantee that the service will be free from
          interruptions or errors.
        </p>
        <p>
          AlamOps&rsquo; maximum liability will be limited to the amount paid
          by the user in the last 12 months.
        </p>
        <p>
          Users are responsible for their use of the platform and any damage
          they may cause through improper use.
        </p>
      </LegalSection>

      <LegalSection id="billing" num="06" title="Billing & Services">
        <p>Free services are subject to technical and support limitations.</p>
        <p>
          Premium and consulting services will be governed by additional
          contracts and agreements (SLA, dedicated support, etc.).
        </p>
        <p>In case of non-payment, AlamOps may suspend or cancel access.</p>
      </LegalSection>

      <LegalSection id="modifications" num="07" title="Modifications">
        <p>
          AlamOps may modify these terms at any time, notifying by email or on
          the platform itself.
        </p>
        <p>
          Continued use of the services implies acceptance of new conditions.
        </p>
      </LegalSection>

      <LegalSection id="jurisdiction" num="08" title="Law & Jurisdiction">
        <p>These terms are governed by Spanish and European legislation.</p>
        <p>
          For any conflict, the courts of Madrid, Spain will be competent,
          unless applicable regulations provide otherwise.
        </p>
      </LegalSection>

      <LegalSection
        id="acceptable-use"
        num="09"
        title="Acceptable Use Policy"
      >
        <h4 className="mono text-[10px] tracking-[0.3em] uppercase text-[#5a6a3a] mt-2 mb-3">
          Permitted use
        </h4>
        <p>The platform may be used for:</p>
        <ul>
          <li>
            Accessing cloud services, consulting and monitoring tools we offer
          </li>
          <li>
            Managing projects legitimately and according to service purpose
          </li>
          <li>
            Collaborating with other authorized users under a security
            framework
          </li>
        </ul>

        <h4 className="mono text-[10px] tracking-[0.3em] uppercase text-[#a33] mt-8 mb-3">
          Prohibited use
        </h4>
        <p>Users commit not to perform the following actions:</p>
        <ul>
          <li>Use the platform for illegal activities or contrary to law</li>
          <li>
            Execute cyber-attacks (DDoS, malware, intrusion, vulnerability
            exploitation)
          </li>
          <li>
            Distribute illegal, defamatory, racist, violent or hate content
          </li>
          <li>
            Attempt unauthorized access to data, accounts or systems of
            AlamOps or third parties
          </li>
          <li>
            Reuse, resell or sublicense the platform without express
            authorization
          </li>
          <li>
            Use the infrastructure for cryptocurrency mining, spam, phishing
            or any abusive activity
          </li>
        </ul>

        <div className="mt-8 border-l-2 border-[#5a6a3a] pl-6 py-2 bg-[#5a6a3a]/[0.03]">
          <h4 className="mono text-[10px] tracking-[0.3em] uppercase text-[#5a6a3a] mb-3">
            Security & confidentiality
          </h4>
          <ul className="text-sm">
            <li>
              Users must keep their credentials secure and immediately notify
              any suspected unauthorized access.
            </li>
            <li>Sharing accounts between multiple users is prohibited.</li>
            <li>
              AlamOps will apply monitoring and auditing measures to detect
              anomalous or abusive behavior.
            </li>
          </ul>
        </div>
      </LegalSection>

      <LegalSection id="enforcement" num="10" title="Enforcement">
        <h4 className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/60 mt-2 mb-3">
          Consequences of non-compliance
        </h4>
        <p>Non-compliance with this Use Policy may result in:</p>
        <ul>
          <li>Immediate account suspension</li>
          <li>Definitive service cancellation</li>
          <li>
            Report to competent authorities in case of illegal activity
          </li>
          <li>Claim for damages caused to AlamOps or third parties</li>
        </ul>

        <div className="mt-8 border border-[#1a1a17]/15 p-5">
          <h4 className="mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/60 mb-2">
            Cooperation with authorities
          </h4>
          <p className="text-sm">
            AlamOps may collaborate with police or judicial authorities in
            case of investigations related to platform misuse, providing
            necessary data according to current regulations.
          </p>
        </div>
      </LegalSection>

      <div className="mt-24 border border-[#1a1a17]/15 p-10 md:p-12 text-center">
        <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#5a6a3a] mb-4">
          Questions?
        </div>
        <h3 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
          Talk to our <span className="italic text-[#5a6a3a]">legal team.</span>
        </h3>
        <p className="text-base leading-relaxed text-[#1a1a17]/70 max-w-xl mx-auto mb-8">
          We&rsquo;re happy to clarify any aspect of our terms of service and
          acceptable use policy.
        </p>
        <a
          href="mailto:legal@alamops.com"
          className="mono text-[11px] tracking-[0.3em] uppercase bg-[#1a1a17] text-[#faf8f3] px-6 py-4 hover:bg-[#5a6a3a] transition-colors inline-flex items-center gap-2"
        >
          <Mail className="w-3.5 h-3.5" />
          Contact legal
        </a>
      </div>

      <div className="mt-16 flex justify-between items-center mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/45">
        <Link
          href="/"
          className="hover:text-[#5a6a3a] transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <Link
          href="/privacy"
          className="hover:text-[#5a6a3a] transition-colors"
        >
          Privacy policy →
        </Link>
      </div>
    </LegalPage>
  );
}
