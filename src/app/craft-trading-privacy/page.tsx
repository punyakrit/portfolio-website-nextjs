import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import CraftTradingPrivacy from "@/components/CraftTradingPrivacy";

export const metadata: Metadata = createMetadata({
  title: "Craft Trading Privacy Policy",
  description:
    "Privacy Policy for Craft Trading — paper trading simulator for educational use. Information we collect, how we use it, data sharing, and contact.",
  path: "/craft-trading-privacy",
  keywords: [
    "Craft Trading privacy",
    "Craft Trading privacy policy",
    "paper trading simulator",
    "LaunchCraft Studios",
  ],
});

export default function CraftTradingPrivacyPage() {
  return <CraftTradingPrivacy />;
}
