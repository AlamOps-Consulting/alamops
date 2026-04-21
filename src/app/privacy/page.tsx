import Link from "next/link";
import { ArrowLeft, Mail, Shield } from "lucide-react";
import { LegalPage, LegalSection } from "@/components/legal-layout";

export const metadata = {
  title: "Privacy Policy",
  description:
    "AlamOps privacy policy — how we collect, process and protect personal data under GDPR and applicable regulations.",
};

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const sections = [
    { id: "purpose", num: "01", title: "Purpose" },
    { id: "data-protection", num: "02", title: "Data Protection" },
    { id: "security", num: "03", title: "Security" },
    { id: "platform-usage", num: "04", title: "Platform Usage" },
    { id: "intellectual-property", num: "05", title: "Intellectual Property" },
    { id: "liability-limitation", num: "06", title: "Liability Limitation" },
    { id: "billing-services", num: "07", title: "Billing & Services" },
    { id: "user-rights", num: "08", title: "User Rights" },
    { id: "contact", num: "09", title: "Contact" },
    { id: "acceptance", num: "10", title: "Acceptance" },
  ];

  return (
    <LegalPage
      kicker="Legal · Privacy"
      icon={<Shield className="w-4 h-4" />}
      title={
        <>
          Privacy <span className="italic text-[#5a6a3a]">policy.</span>
        </>
      }
      subtitle="AlamOps Consulting · GDPR compliant"
      updated={currentDate}
      intro="Security, transparency and data protection are our priorities. By registering on our platform, you confirm that you have read and accepted these terms."
      sections={sections}
    >
      <LegalSection id="purpose" num="01" title="Purpose">
        <p>
          These terms regulate the use of services, applications, and digital
          platforms offered by AlamOps Consulting. By registering, you agree
          to comply with this policy in its entirety.
        </p>
      </LegalSection>

      <LegalSection id="data-protection" num="02" title="Data Protection">
        <p>
          AlamOps Consulting complies with European and local data protection
          regulations (including the General Data Protection Regulation &mdash;
          GDPR).
        </p>
        <p>
          Personal data collected during registration will be used exclusively
          for providing contracted services, managing commercial relationships
          and improving the user experience.
        </p>
        <p>
          Data will not be transferred to third parties without express consent,
          except when legally required.
        </p>
      </LegalSection>

      <LegalSection id="security" num="03" title="Security">
        <p>
          We apply advanced cybersecurity and DevSecOps measures, including
          encryption, automated audits and continuous monitoring.
        </p>
        <p>
          Despite our efforts, no system is 100% secure; users accept the
          inherent risks of using online services.
        </p>
      </LegalSection>

      <LegalSection id="platform-usage" num="04" title="Platform Usage">
        <p>
          Users commit to using the services legally and in accordance with
          good-faith principles.
        </p>
        <p>
          Using the platform for illegal activities, cyber-attacks or
          unauthorized access is prohibited.
        </p>
        <p>
          AlamOps reserves the right to suspend or cancel accounts that violate
          this policy.
        </p>
      </LegalSection>

      <LegalSection
        id="intellectual-property"
        num="05"
        title="Intellectual Property"
      >
        <p>
          All content, software, documentation and trademarks are property of
          AlamOps Consulting or their respective licensed owners.
        </p>
        <p>
          Copying, distributing or modifying material without prior
          authorization is not permitted.
        </p>
      </LegalSection>

      <LegalSection
        id="liability-limitation"
        num="06"
        title="Liability Limitation"
      >
        <p>
          AlamOps Consulting will not be responsible for temporary
          interruptions, data loss caused by third parties or misuse of the
          platform.
        </p>
        <p>
          Users are responsible for maintaining the confidentiality of their
          credentials.
        </p>
      </LegalSection>

      <LegalSection id="billing-services" num="07" title="Billing & Services">
        <p>
          When contracting premium or consulting services, specific conditions
          (prices, billing, support) will be regulated in a separate contract.
        </p>
      </LegalSection>

      <LegalSection id="user-rights" num="08" title="User Rights">
        <p>Users have the right to:</p>
        <ul>
          <li>Access, rectify and delete their personal data.</li>
          <li>Request data portability.</li>
          <li>Withdraw consent at any time.</li>
        </ul>
      </LegalSection>

      <LegalSection id="contact" num="09" title="Contact">
        <p>
          To exercise your rights or resolve questions about this policy, you
          can contact us at:
        </p>
        <div className="mt-4 border border-[#1a1a17]/15 p-5 inline-flex items-center gap-3">
          <Mail className="w-4 h-4 text-[#5a6a3a]" />
          <a
            href="mailto:legal@alamops.com"
            className="mono text-sm tracking-tight hover:text-[#5a6a3a] transition-colors"
          >
            legal@alamops.com
          </a>
        </div>
      </LegalSection>

      <LegalSection id="acceptance" num="10" title="Acceptance">
        <p>
          By clicking &ldquo;Accept&rdquo; during registration, users confirm
          they have read, understood and accepted these terms and conditions.
        </p>
      </LegalSection>

      <div className="mt-24 border border-[#1a1a17]/15 p-10 md:p-12 text-center">
        <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#5a6a3a] mb-4">
          Questions?
        </div>
        <h3 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
          Talk to our <span className="italic text-[#5a6a3a]">legal team.</span>
        </h3>
        <p className="text-base leading-relaxed text-[#1a1a17]/70 max-w-xl mx-auto mb-8">
          We&rsquo;re happy to resolve any question about data processing or
          our terms of service.
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
          href="/terms"
          className="hover:text-[#5a6a3a] transition-colors"
        >
          Terms of service →
        </Link>
      </div>
    </LegalPage>
  );
}
