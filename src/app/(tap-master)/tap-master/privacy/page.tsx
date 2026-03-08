import { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy – Tap Master",
  description:
    "Privacy Policy for Tap Master – Test Your Reflexes. How we collect, use, and protect your data. No login required.",
  path: "/tap-master/privacy",
  keywords: [
    "Tap Master privacy",
    "Tap Master privacy policy",
    "reflex game privacy",
  ],
});

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <main className="mx-auto max-w-[720px] px-6 py-16 sm:px-8 sm:py-20">
        <header className="mb-14">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-lg text-neutral-500">Last updated: 2026</p>
        </header>

        <article className="space-y-12">
          <section aria-labelledby="intro-heading">
            <h2
              id="intro-heading"
              className="text-xl font-semibold text-neutral-900 sm:text-2xl"
            >
              Introduction
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-700">
              Tap Master respects your privacy. We collect only the minimal
              information necessary to run the game, show leaderboards, and
              improve your experience. No account or login is required to play.
            </p>
          </section>

          <section aria-labelledby="collect-heading">
            <h2
              id="collect-heading"
              className="text-xl font-semibold text-neutral-900 sm:text-2xl"
            >
              Information We Collect
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-700">
              The app may collect:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-neutral-700">
              <li>Optional display name entered by the player (for leaderboards)</li>
              <li>Reaction score data</li>
              <li>Basic gameplay statistics</li>
            </ul>
            <p className="mt-4 leading-relaxed text-neutral-700">
              No account or login is required. You can play without providing
              any personal information.
            </p>
          </section>

          <section aria-labelledby="advertising-heading">
            <h2
              id="advertising-heading"
              className="text-xl font-semibold text-neutral-900 sm:text-2xl"
            >
              Advertising
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-700">
              Tap Master uses third-party advertising services such as Google
              AdMob to display ads. These services may collect anonymized data
              (e.g., device type, general location) to deliver and improve
              advertising. We do not control the data practices of these
              third-party ad providers. You can learn more about their policies
              in their respective privacy notices.
            </p>
          </section>

          <section aria-labelledby="analytics-heading">
            <h2
              id="analytics-heading"
              className="text-xl font-semibold text-neutral-900 sm:text-2xl"
            >
              Analytics and Data Storage
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-700">
              We use Firebase to store gameplay data such as scores and
              leaderboard information. This allows us to save your results and
              display global and friend leaderboards. Data stored in Firebase is
              subject to Google’s privacy policy and security practices.
            </p>
          </section>

          <section aria-labelledby="usage-heading">
            <h2
              id="usage-heading"
              className="text-xl font-semibold text-neutral-900 sm:text-2xl"
            >
              Data Usage
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-700">
              Collected data is used only for:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-neutral-700">
              <li>Saving player scores</li>
              <li>Showing leaderboards</li>
              <li>Improving the gameplay experience</li>
            </ul>
            <p className="mt-4 leading-relaxed text-neutral-700">
              We do not sell your data or use it for purposes unrelated to the
              app.
            </p>
          </section>

          <section aria-labelledby="security-heading">
            <h2
              id="security-heading"
              className="text-xl font-semibold text-neutral-900 sm:text-2xl"
            >
              Data Security
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-700">
              We take reasonable measures to protect the data we store,
              including the use of secure connections and trusted infrastructure
              (e.g., Firebase). While no system is completely secure, we aim to
              follow industry practices to safeguard your information.
            </p>
          </section>

          <section aria-labelledby="children-heading">
            <h2
              id="children-heading"
              className="text-xl font-semibold text-neutral-900 sm:text-2xl"
            >
              Children’s Privacy
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-700">
              Tap Master does not knowingly collect personal data from children.
              The app is designed to collect only minimal, non-personal
              information (e.g., optional display name and scores). If you
              believe a child has provided personal information through the app,
              please contact us and we will take steps to remove it.
            </p>
          </section>

          <section aria-labelledby="changes-heading">
            <h2
              id="changes-heading"
              className="text-xl font-semibold text-neutral-900 sm:text-2xl"
            >
              Changes to This Policy
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-700">
              We may update this Privacy Policy occasionally. The “Last updated”
              date at the top of this page will reflect the latest version. We
              encourage you to review this policy from time to time. Continued
              use of Tap Master after changes constitutes acceptance of the
              updated policy.
            </p>
          </section>

          <section aria-labelledby="contact-heading">
            <h2
              id="contact-heading"
              className="text-xl font-semibold text-neutral-900 sm:text-2xl"
            >
              Contact
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-700">
              For questions about this Privacy Policy or your data, contact us
              at:{" "}
              <a
                href="mailto:launchcrafts@gmail.com"
                className="text-neutral-900 underline underline-offset-2 hover:text-neutral-600"
              >
                launchcrafts@gmail.com
              </a>
            </p>
          </section>
        </article>

        <footer className="mt-16 border-t border-neutral-200 pt-10">
          <p className="text-lg font-semibold text-neutral-900">
            Tap Master – Test Your Reflexes
          </p>
          <p className="mt-2 text-neutral-600">
            Developed by Punyakrit Singh Makhni
          </p>
          <Link
            href="/tap-master"
            className="mt-6 inline-block text-neutral-700 underline underline-offset-2 hover:text-neutral-900"
          >
            Back to Tap Master
          </Link>
        </footer>
      </main>
    </div>
  );
}
