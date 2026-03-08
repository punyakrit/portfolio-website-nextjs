import Link from "next/link";

const APP_STORE_URL = "https://apps.apple.com/app/tap-master/id0000000000";

export default function TapMaster() {
  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-14">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Tap Master – Test Your Reflexes
          </h1>
          <p className="mt-3 text-lg text-neutral-600">
            Test how fast your reflexes are in this addictive reaction speed
            game.
          </p>
        </header>

        <section className="mb-12" aria-labelledby="about-heading">
          <h2
            id="about-heading"
            className="mb-4 text-xl font-semibold text-neutral-900"
          >
            About the App
          </h2>
          <p className="leading-relaxed text-neutral-700">
            Tap Master is a reaction speed game. Tap the dot as fast as you can
            when it appears, beat your best time, and climb the leaderboard. No
            account or login required—just tap and play.
          </p>
        </section>

        <section className="mb-12" aria-labelledby="download-heading">
          <h2
            id="download-heading"
            className="mb-4 text-xl font-semibold text-neutral-900"
          >
            Download
          </h2>
          <p className="mb-4 leading-relaxed text-neutral-700">
            Get Tap Master on the App Store.
          </p>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-700 underline underline-offset-2 hover:text-neutral-900"
          >
            Download on the App Store
          </a>
        </section>

        <section className="mb-12" aria-labelledby="privacy-heading">
          <h2
            id="privacy-heading"
            className="mb-4 text-xl font-semibold text-neutral-900"
          >
            Privacy & Data
          </h2>
          <p className="leading-relaxed text-neutral-700">
            The app does not require login. Players can optionally enter a
            display name. Reaction scores and gameplay data are stored using
            Firebase for leaderboards. Ads are shown to support development. We
            do not collect sensitive personal data.
          </p>
          <p className="mt-4">
            <Link
              href="/tap-master/privacy"
              className="text-neutral-700 underline underline-offset-2 hover:text-neutral-900"
            >
              Full Privacy Policy
            </Link>
          </p>
        </section>

        <section className="mb-12" aria-labelledby="contact-heading">
          <h2
            id="contact-heading"
            className="mb-4 text-xl font-semibold text-neutral-900"
          >
            Contact
          </h2>
          <ul className="space-y-2 text-neutral-700">
            <li>
              <span className="font-medium text-neutral-800">Email:</span>{" "}
              <a
                href="mailto:launchcrafts@gmail.com"
                className="underline underline-offset-2 hover:text-neutral-900"
              >
                launchcrafts@gmail.com
              </a>
            </li>
          </ul>
        </section>

        <footer>
          <p className="text-sm text-neutral-500">
            Tap Master – Test Your Reflexes. Developed by Punyakrit Singh
            Makhni.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm text-neutral-500 underline underline-offset-2 hover:text-neutral-700"
          >
            Back to portfolio
          </Link>
        </footer>
      </article>
    </main>
  );
}
