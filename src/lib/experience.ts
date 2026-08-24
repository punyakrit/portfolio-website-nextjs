interface Role {
    company: string;
    /** Company homepage. Empty string if there isn't one worth linking. */
    url: string;
    position: string;
    /** One short line. This is all the site renders. */
    oneLiner: string;
    startDate: string;
    endDate: string;
}

export const experience: Readonly<Role[]> = [
    {
        company: "gradly.us",
        url: "https://gradly.us",
        position: "Software Engineer",
        oneLiner:
            "Got 15,000+ international students insured in the US.",
        startDate: "2026-03-01",
        endDate: "2026-07-01",
    },
    {
        company: "thefocus.ai",
        url: "https://thefocus.ai",
        position: "Software Engineer (Contract)",
        oneLiner:
            "Shipped its AI features, then rebuilt the infra to cut load times ~80%.",
        startDate: "2025-12-01",
        endDate: "2026-03-01",
    },
    {
        // Muze (muzecmo.com) - AI marketing platform, formerly shown as AgentProd.
        company: "muze",
        url: "https://muzecmo.com/",
        position: "Software Engineer",
        oneLiner:
            "Muze CMO, from scratch: an AI agent that scores ad creative before spend, then generates the next one.",
        startDate: "2024-06-01",
        endDate: "2025-10-01",
    },
    {
        company: "independent projects",
        url: "https://github.com/punyakrit",
        position: "Founder & Software Engineer",
        oneLiner:
            "Agent pipelines, a video system used by 50+ brands, an iOS app on the App Store.",
        startDate: "2023-02-01",
        endDate: "Present",
    },
];
