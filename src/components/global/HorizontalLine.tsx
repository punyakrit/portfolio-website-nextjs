import React from "react";

// A section divider. No hooks, no client boundary.
//
// The original drew a 2px bar with the literals `dark:bg-[#1B1B1B] bg-[#f0f0f0]`,
// which belonged to the retired #121212 palette. Today the dark background is
// #100f0e and there is a real token for rules (--rule, exposed as bg-rule), so
// the divider follows the theme instead of fighting it.
function HorizontalLine() {
  return <div className="h-px w-full bg-rule md:my-16 my-8" />;
}

export default HorizontalLine;
