import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import TapMaster from "@/components/TapMaster";

export const metadata: Metadata = createMetadata({
  title: "Tap Master – Test Your Reflexes",
  description:
    "Test how fast your reflexes are in this addictive reaction speed game. Tap the dot, beat your best time, and climb the leaderboard.",
  path: "/tap-master",
  keywords: [
    "Tap Master",
    "reflex game",
    "reaction speed",
    "mobile game",
    "iOS game",
    "reflex test",
  ],
});

export default function TapMasterPage() {
  return <TapMaster />;
}
