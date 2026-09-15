import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Restored from cab7941. Three class-level adaptations were required because the
 * current src/app/globals.css is the flattened "document" theme, which aliases
 * several shadcn surface tokens onto --background and dropped two global base
 * rules the original cva strings relied on:
 *
 *  1. `no-underline` on the base — globals.css now has `@layer base { a { ... } }`
 *     with a resting underline. `asChild` renders an <a> (ProjectCard does this
 *     three times), so every link-button would arrive underlined. The `link`
 *     variant is unaffected: it never had a resting underline, and its
 *     `hover:underline` still wins on hover.
 *  2. bare `border` -> `border border-border` on `outline` — the old globals.css
 *     had `@layer base { * { @apply border-border } }`; the current one does not,
 *     so Tailwind v4's default border-color (currentColor) would paint a
 *     full-strength near-black hairline in light mode.
 *  3. `hover:bg-accent` / `hover:bg-secondary/80` -> `hover:bg-foreground/5` —
 *     --accent, --secondary and --muted are all `var(--background)` today, so
 *     those hovers are no-ops and `variant="secondary"` renders an invisible
 *     button. The token names are kept where they still carry contrast; only the
 *     dead ones are mapped onto a value globals.css actually defines.
 *
 * If globals.css later gives --secondary/--accent real surface values, nothing
 * here needs to change. Radii are deliberately NOT hardcoded: `rounded-md`
 * follows --radius-md, which is the theme's call, not the primitive's.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium no-underline transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-border bg-background shadow-xs hover:bg-foreground/5 hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground border border-border hover:bg-foreground/5",
        ghost: "hover:bg-foreground/5 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
