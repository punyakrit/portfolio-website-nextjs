"use client";

import React from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";
import { useTheme } from "next-themes";

// Greyscale contribution grid. No colour, because colour here would be the only
// colour on the site and it would mean nothing.
class Boundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Commits({ data }: { data: Activity[] }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";

  return (
    <Boundary>
      <div className="overflow-x-auto">
        <ActivityCalendar
          data={data}
          blockSize={9}
          blockMargin={3}
          fontSize={12}
          hideTotalCount
          hideColorLegend
          theme={{
            light: ["#eceae5", "#c7c4bd", "#9c9891", "#6b6862", "#3a3833"],
            dark: ["#232220", "#3c3a36", "#5c5952", "#8a867d", "#c9c5bb"],
          }}
          colorScheme={dark ? "dark" : "light"}
          labels={{ totalCount: "{{count}} commits in the last year" }}
        />
      </div>
    </Boundary>
  );
}
