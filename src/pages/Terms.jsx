/**
 * © 2026 Amol Mishra (CodeCraftAmol). All rights reserved.
 * Website: https://examtools.in
 * This file is proprietary. Unauthorized copying or reuse is prohibited.
 */

import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const LAST_UPDATED = 'March 29, 2026';
const EFFECTIVE_DATE = 'March 29, 2026';
const CONTACT_EMAIL = 'support@examtools.in';
const SITE_URL = 'https://examtools.in';

const Section = ({ id, icon, title, children }) => (
  <section id={id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm p-8 md:p-10 transition-colors duration-300">
    <div className="flex items-start gap-4 mb-5">
      <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-xl shrink-0 shadow-inner">
        {icon}
      </div>
      <h2 id={id} className="text-xl font-bold text-slate-800 dark:text-white tracking-tight pt-1.5">{title}</h2>
    </div>
    <div className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed space-y-3 text-[15px]">
      {children}
    </div>
  </section>
);

export default function Terms() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 transition-colors duration-300">
      <SEO
        title="Terms of Use — ExamTools.in"
        description="Read the Terms of Use for ExamTools.in. Learn about permitted use, intellectual property rights, copyright restrictions, disclaimers, and legal policies."
        keywords="examtools terms of use, terms and conditions, copyright policy, intellectual property examtools"
        url={`${SITE_URL}/terms`}
        noIndex={false}
      />

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white text-3xl mb-6 shadow-lg shadow-blue-600/30">
          ⚖️
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-4">
          Terms of <span className="text-blue-600 dark:text-blue-400">Use</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
          Please read these terms carefully before using ExamTools.in.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-slate-400 dark:text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Last updated: {LAST_UPDATED}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Effective: {EFFECTIVE_DATE}
          </span>
        </div>
      </div>

      {/* ── Copyright Banner ────────────────────────────────── */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-10 text-white shadow-lg shadow-blue-600/20">
        <div className="flex items-start gap-4">
          <span className="text-3xl shrink-0">©</span>
          <div>
            <p className="font-bold text-lg mb-1">© 2026 Amol Mishra (CodeCraftAmol). All rights reserved.</p>
            <p className="text-blue-100 font-medium text-sm leading-relaxed">
              All content, source code, tool logic, UI design, and blog articles on ExamTools.in are the exclusive intellectual property of Amol Mishra. Unauthorized copying, reproduction, or distribution is strictly prohibited and may result in legal action.
            </p>
          </div>
        </div>
      </div>

      {/* ── Sections ────────────────────────────────────────── */}
      <div className="space-y-6">

        <Section id="acceptance" icon="📋" title="1. Acceptance of Terms">
          <p>
            By accessing or using <strong className="text-slate-800 dark:text-slate-200">ExamTools.in</strong> ("the Website"), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must immediately discontinue use of the Website.
          </p>
          <p>
            These terms constitute a legally binding agreement between you (the "User") and Amol Mishra ("the Owner"), the sole creator and copyright holder of ExamTools.in.
          </p>
        </Section>

        <Section id="permitted-use" icon="✅" title="2. Permitted Use">
          <p>You are permitted to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access and use the tools on ExamTools.in for <strong className="text-slate-800 dark:text-slate-200">personal, non-commercial exam preparation</strong> purposes.</li>
            <li>Share links to the Website on social media, blogs, or forums.</li>
            <li>Reference the Website in educational or review content, provided clear attribution is given to ExamTools.in.</li>
          </ul>
          <p className="mt-2">All other uses require prior written permission from the Owner.</p>
        </Section>

        <Section id="intellectual-property" icon="🔒" title="3. Intellectual Property & Copyright">
          <p>
            The Website and all its contents — including but not limited to <strong className="text-slate-800 dark:text-slate-200">source code, JavaScript logic, React components, UI/UX design, CSS styles, blog articles, written guides, images, icons, and tool algorithms</strong> — are the exclusive intellectual property of <strong className="text-slate-800 dark:text-slate-200">Amol Mishra</strong> and are protected under applicable copyright and intellectual property laws.
          </p>
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 rounded-xl p-5 mt-4">
            <p className="font-bold text-red-700 dark:text-red-400 mb-3 text-base">❌ The following actions are strictly prohibited:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li>Copying, cloning, or reproducing the source code (in whole or in part)</li>
              <li>Modifying, adapting, or creating derivative works from the codebase</li>
              <li>Distributing, sublicensing, or selling the source code or any component thereof</li>
              <li>Using the tool logic, algorithms, or UI design for another product or project</li>
              <li>Removing, hiding, or altering any copyright, ownership, or authorship notices</li>
              <li>Scraping, mirroring, or archiving the Website's content systematically</li>
              <li>Reverse engineering, decompiling, or disassembling the production build</li>
            </ul>
          </div>
        </Section>

        <Section id="tools-usage" icon="🛠️" title="4. Tool Usage Policy">
          <p>
            The tools provided on ExamTools.in are offered as-is for personal convenience. By using these tools, you acknowledge:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All file processing occurs <strong className="text-slate-800 dark:text-slate-200">locally in your browser</strong> — your files are not uploaded to or stored on any server.</li>
            <li>The Owner makes no guarantee that tool outputs will meet all external platform requirements. Always verify processed files before submission.</li>
            <li>The tools are provided free of charge and may be modified, discontinued, or restricted at any time without prior notice.</li>
            <li>You agree not to use the tools for any illegal, fraudulent, or malicious purpose (e.g., forging official documents).</li>
          </ul>
        </Section>

        <Section id="disclaimer" icon="⚠️" title="5. Disclaimer of Warranties">
          <p>
            ExamTools.in is provided <strong className="text-slate-800 dark:text-slate-200">"as is"</strong> and <strong className="text-slate-800 dark:text-slate-200">"as available"</strong> without any warranty of any kind, either express or implied, including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
            <li>Guarantees that the Website will be error-free, uninterrupted, or available at all times</li>
            <li>Accuracy or completeness of any content, guide, or tool output</li>
          </ul>
          <p>
            The Owner shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of, or inability to use, the Website or its tools.
          </p>
        </Section>

        <Section id="privacy" icon="🔐" title="6. Privacy & Data Collection">
          <p>
            ExamTools.in uses <strong className="text-slate-800 dark:text-slate-200">Google Analytics (GA4)</strong> to collect anonymized usage data (page views, tool clicks) for the purpose of improving the Website. No personally identifiable information is collected.
          </p>
          <p>
            Files processed through the tools are handled entirely within your browser. No file content is transmitted to, stored on, or processed by any external server owned by ExamTools.in.
          </p>
        </Section>

        <Section id="third-party" icon="🔗" title="7. Third-Party Links & Services">
          <p>
            This Website may contain links to third-party websites or services (e.g., GitHub, Google Fonts). These are provided for convenience only. The Owner has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party site.
          </p>
        </Section>

        <Section id="changes" icon="🔄" title="8. Changes to These Terms">
          <p>
            The Owner reserves the right to update or modify these Terms of Use at any time without prior notice. Changes will be reflected on this page with an updated "Last Updated" date. Continued use of the Website after changes constitutes your acceptance of the revised terms.
          </p>
        </Section>

        <Section id="legal" icon="⚖️" title="9. Legal Action for Violations">
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5">
            <p className="font-bold text-amber-800 dark:text-amber-400 text-base mb-2">Enforcement Notice</p>
            <p>
              Any unauthorized use, reproduction, distribution, or commercial exploitation of the Website's intellectual property — including source code, design, content, or tool logic — may result in:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Immediate legal notice via email or postal mail</li>
              <li>Civil claims for copyright infringement under applicable law</li>
              <li>Pursuit of damages, attorney's fees, and injunctive relief</li>
              <li>Criminal prosecution where applicable under Indian Information Technology Act, 2000</li>
            </ul>
          </div>
        </Section>

        <Section id="governing-law" icon="🏛️" title="10. Governing Law & Jurisdiction">
          <p>
            These Terms of Use are governed by and construed in accordance with the laws of <strong className="text-slate-800 dark:text-slate-200">India</strong>. Any disputes arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the courts located in <strong className="text-slate-800 dark:text-slate-200">Mumbai, Maharashtra, India</strong>.
          </p>
        </Section>

        <Section id="contact" icon="📧" title="11. Contact Information">
          <p>
            If you have questions about these Terms, wish to report a violation, or want to request permission for a specific use, please contact:
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 mt-3">
            <p className="font-bold text-slate-800 dark:text-slate-200 mb-1">Amol Mishra (CodeCraftAmol)</p>
            <p>
              📧 <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">{CONTACT_EMAIL}</a>
            </p>
            <p className="mt-1">
              🌐 <a href={SITE_URL} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">{SITE_URL}</a>
            </p>
          </div>
        </Section>

      </div>

      {/* ── Footer Nav ──────────────────────────────────────── */}
      <div className="mt-14 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          Back to Home
        </Link>
        <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-4">
          © {new Date().getFullYear()} Amol Mishra (CodeCraftAmol). All rights reserved.
        </p>
      </div>
    </main>
  );
}
