import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import CraftTradingSupport from "@/components/CraftTradingSupport";

export const metadata: Metadata = createMetadata({
  title: "Craft Trading Support",
  description:
    "Craft Trading support and help. Paper trading simulator for educational use. Contact support, FAQ, and disclaimer.",
  path: "/craft-trading-support",
  keywords: [
    "Craft Trading support",
    "Craft Trading help",
    "paper trading simulator",
    "LaunchCraft Studios",
  ],
});

export default function CraftTradingSupportPage() {
  return <CraftTradingSupport />;
}
