export default function CraftTradingPrivacy() {
  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-[800px] mx-auto px-6 py-16">
        <header className="mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Craft Trading Privacy Policy
          </h1>
          <p className="mt-3 text-lg text-neutral-600">
            Paper Trading Simulator for Educational Use
          </p>
        </header>

        <section className="mb-10" aria-labelledby="effective-date-heading">
          <h2 id="effective-date-heading" className="text-xl font-semibold text-neutral-900 mb-4">
            Effective Date
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            This Privacy Policy is effective as of January 1, 2026 and applies to the Craft Trading application.
          </p>
        </section>

        <section className="mb-10" aria-labelledby="collect-heading">
          <h2 id="collect-heading" className="text-xl font-semibold text-neutral-900 mb-4">
            Information We Collect
          </h2>
          <p className="text-neutral-700 leading-relaxed mb-3">
            Craft Trading collects only the information necessary to provide and improve the app experience:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700 leading-relaxed">
            <li>Full name (for account creation)</li>
            <li>Authentication data (e.g., login credentials, session information)</li>
            <li>Simulated trading and portfolio data (virtual positions, watchlists, and activity within the app)</li>
          </ul>
          <p className="text-neutral-700 leading-relaxed mt-4">
            We do not collect payment information, real financial data, or information unrelated to the operation of the app.
          </p>
        </section>

        <section className="mb-10" aria-labelledby="use-heading">
          <h2 id="use-heading" className="text-xl font-semibold text-neutral-900 mb-4">
            How We Use Information
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            The information we collect is used solely to operate the app, maintain your account, sync your simulated portfolio and trading data across devices, and improve the service. We do not use your data for advertising, marketing, or any purpose other than core app functionality.
          </p>
        </section>

        <section className="mb-10" aria-labelledby="sharing-heading">
          <h2 id="sharing-heading" className="text-xl font-semibold text-neutral-900 mb-4">
            Data Sharing
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            We do not sell, rent, or trade your personal information. Data may be processed by our backend infrastructure (e.g., Supabase) solely for core functionality such as authentication and data storage. We do not share your information with third parties for advertising, analytics, or cross-app tracking.
          </p>
        </section>

        <section className="mb-10" aria-labelledby="tracking-heading">
          <h2 id="tracking-heading" className="text-xl font-semibold text-neutral-900 mb-4">
            Tracking
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            Craft Trading does not use third-party advertising, cross-app tracking, or behavioral tracking for advertising purposes. The app does not include ad networks or analytics that track you across other apps or websites.
          </p>
        </section>

        <section className="mb-10" aria-labelledby="security-heading">
          <h2 id="security-heading" className="text-xl font-semibold text-neutral-900 mb-4">
            Data Security
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            We use industry-standard practices to protect your data, including secure authentication and encrypted connections. Your data is stored on secure backend infrastructure and accessed only as needed to provide the service.
          </p>
        </section>

        <section className="mb-10" aria-labelledby="disclaimer-heading">
          <h2 id="disclaimer-heading" className="text-xl font-semibold text-neutral-900 mb-4">
            Educational Purpose Disclaimer
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            Craft Trading is a simulated trading application for educational purposes only. It does not support real money transactions, deposits, or withdrawals. The app does not provide financial advice, brokerage services, or real investment functionality. All trading within the app is simulated using virtual funds.
          </p>
        </section>

        <section className="mb-14" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-xl font-semibold text-neutral-900 mb-4">
            Contact Information
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            For questions about this Privacy Policy or your data, contact us at:{" "}
            <a
              href="mailto:support@launchcraft.studio"
              className="text-neutral-700 underline underline-offset-2 hover:text-neutral-900"
            >
              support@launchcraft.studio
            </a>
          </p>
        </section>

        <footer>
          <p className="text-sm text-neutral-500">
            © 2026 LaunchCraft Studios. All rights reserved.
          </p>
        </footer>
      </article>
    </main>
  );
}
