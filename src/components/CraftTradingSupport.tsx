export default function CraftTradingSupport() {
  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Craft Trading Support
          </h1>
          <p className="mt-3 text-lg text-neutral-600">
            Paper Trading Simulator for Educational Use
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Current Version: 1.0
          </p>
        </header>

        <section className="mb-12" aria-labelledby="about-heading">
          <h2 id="about-heading" className="text-xl font-semibold text-neutral-900 mb-4">
            About the App
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            Craft Trading is a paper trading simulator that allows users to practice stock trading using virtual money. The app is designed for educational purposes and does not support real money transactions, deposits, or withdrawals. Craft Trading does not offer brokerage services, investment accounts, or financial advisory services.
          </p>
        </section>

        <section className="mb-12" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-xl font-semibold text-neutral-900 mb-4">
            Contact Support
          </h2>
          <ul className="space-y-2 text-neutral-700">
            <li>
              <span className="font-medium text-neutral-800">Email:</span>{" "}
              <a
                href="mailto:launchcrafts@gmail.com
"
                className="text-neutral-700 underline underline-offset-2 hover:text-neutral-900"
              >
launchcrafts@gmail.com
</a>
              
            </li>
            <li>
              <span className="font-medium text-neutral-800">Alternative:</span>{" "}
              <a
                href="mailto:punyakritsinghmakhni@gmail.com"
                className="text-neutral-700 underline underline-offset-2 hover:text-neutral-900"
              >
                punyakritsinghmakhni@gmail.com
              </a>
            </li>
            <li>
              <span className="font-medium text-neutral-800">Response time:</span> Within 24–48 hours.
            </li>
          </ul>
        </section>

        <section className="mb-12" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-semibold text-neutral-900 mb-6">
            FAQ
          </h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-medium text-neutral-900 mb-1">
                Is this app connected to a real brokerage?
              </dt>
              <dd className="text-neutral-700 leading-relaxed pl-0">
                No. Craft Trading is a simulated trading environment and does not connect to real financial institutions.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900 mb-1">
                Can I deposit or withdraw money?
              </dt>
              <dd className="text-neutral-700 leading-relaxed pl-0">
                No. All funds inside the app are virtual and used only for simulation.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900 mb-1">
                Does this app provide financial advice?
              </dt>
              <dd className="text-neutral-700 leading-relaxed pl-0">
                No. The app is strictly for educational and learning purposes.
              </dd>
            </div>
          </dl>
        </section>

        <section className="mb-14" aria-labelledby="disclaimer-heading">
          <h2 id="disclaimer-heading" className="sr-only">
            Disclaimer
          </h2>
          <div className="bg-neutral-100 rounded-lg px-5 py-4 border border-neutral-200">
            <p className="text-neutral-700 text-sm leading-relaxed">
              Craft Trading is a simulated trading application. It does not provide financial advice, brokerage services, or real investment functionality.
            </p>
          </div>
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
