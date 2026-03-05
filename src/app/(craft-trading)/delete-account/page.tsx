import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Craft Trading – Account Deletion",
  description:
    "How to request deletion of your Craft Trading account and associated data. Steps, what data is deleted, retention policy, and contact.",
  path: "/delete-account",
  keywords: [
    "Craft Trading account deletion",
    "delete Craft Trading account",
    "Craft Trading data deletion",
    "LaunchCraft Studios",
  ],
});

export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-[800px] mx-auto px-6 py-12 sm:py-16">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Account Deletion
          </h1>
          <p className="mt-3 text-lg text-neutral-600">
            How to request deletion of your Craft Trading account and associated
            data.
          </p>
        </header>

        <hr className="border-neutral-200 mb-10" />

        <section
          className="mb-10"
          aria-labelledby="how-to-request-heading"
        >
          <h2
            id="how-to-request-heading"
            className="text-xl font-semibold text-neutral-900 mb-4"
          >
            How to request account deletion
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-neutral-700 leading-relaxed">
            <li>Send an email to launchcrafts@gmail.com</li>
            <li>Use the subject line &quot;Account Deletion Request&quot;</li>
            <li>
              Include the User Id associated with your Craft Trading
              account
            </li>
          </ol>
          <div className="mt-6 p-4 sm:p-5 rounded-lg bg-neutral-100 text-neutral-800 leading-relaxed">
            <p>
              Our team will process and permanently delete the account after
              verification.
            </p>
          </div>
        </section>

        <hr className="border-neutral-200 mb-10" />

        <section
          className="mb-10"
          aria-labelledby="what-data-heading"
        >
          <h2
            id="what-data-heading"
            className="text-xl font-semibold text-neutral-900 mb-4"
          >
            What data is deleted
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700 leading-relaxed">
            <li>User profile information</li>
            <li>Account credentials</li>
            <li>Paper trading history</li>
            <li>Account-related analytics data</li>
          </ul>
        </section>

        <hr className="border-neutral-200 mb-10" />

        <section
          className="mb-10"
          aria-labelledby="data-retention-heading"
        >
          <h2
            id="data-retention-heading"
            className="text-xl font-semibold text-neutral-900 mb-4"
          >
            Data retention
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            Some system logs may be retained for up to 30 days for security and
            fraud prevention before being permanently deleted.
          </p>
        </section>

        <hr className="border-neutral-200 mb-10" />

        <section
          className="mb-14"
          aria-labelledby="contact-heading"
        >
          <h2
            id="contact-heading"
            className="text-xl font-semibold text-neutral-900 mb-4"
          >
            Contact
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            If you have questions regarding your data or account deletion
            request, contact{" "}
            <a
              href="mailto:launchcrafts@gmail.com"
              className="text-neutral-800 underline underline-offset-2 hover:text-neutral-900"
            >
              launchcrafts@gmail.com
            </a>
            .
          </p>
        </section>

        <footer>
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} LaunchCraft Studios. All rights
            reserved.
          </p>
        </footer>
      </article>
    </main>
  );
}
