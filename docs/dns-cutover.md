# DNS cutover: Namecheap -> Cloudflare

Captured 2026-09-13 by querying `dns1.registrar-servers.com` directly.
The registrar UI is not the source of truth; neither is a cached resolver.

## Why this file exists

Cloudflare's import scan misses records. Diff whatever it imports against the
table below **before** changing nameservers, and add by hand whatever it missed.

A warning about how this was captured: `dig +short A www.punyakrit.dev` returns
the CNAME *target*, and it does so for A, AAAA, TXT and MX alike. Read naively
that makes one CNAME look like five records. Everything below is type-matched
against the ANSWER section, so `www` is what it actually is - a single CNAME.

## The zone is not only this site

Nine of these hostnames are *other* Vercel projects. Moving nameservers moves
the whole zone, so all fourteen records have to exist on Cloudflare or those
projects stop resolving - a harder failure than the 402 they currently return.

## The 14 records

| Name | Type | Value | On Cloudflare |
|---|---|---|---|
| `punyakrit.dev` | A | `216.198.79.1` | **Delete.** Replaced by the Worker custom domain. |
| `punyakrit.dev` | TXT | `google-site-verification=EnWjj2kw4GAElzcfGFX28FfJsc6EtEnJqszqQYSAkcA` | Recreate as-is |
| `punyakrit.dev` | TXT | `google-site-verification=UWoKZpa5z8aQkvM6W_XUv6Eer5KQqIAolAfHMs_MvZA` | Recreate as-is |
| `www` | CNAME | `593cc4e6d01cbf61.vercel-dns-017.com` | **Delete.** Replaced by the Worker custom domain. |
| `arcane` | CNAME | `0c64ea1ab6d6c91d.vercel-dns-017.com` | Recreate — **DNS only (grey cloud)** |
| `auth` | CNAME | `2a863e1acb949108.vercel-dns-017.com` | Recreate — **DNS only (grey cloud)** |
| `codelens` | CNAME | `59d221647c389f50.vercel-dns-017.com` | Recreate — **DNS only (grey cloud)** |
| `kill-switch` | CNAME | `46928d360839cd22.vercel-dns-017.com` | Recreate — **DNS only (grey cloud)** |
| `notes` | CNAME | `a517cbdfd5bf9e99.vercel-dns-017.com` | Recreate — **DNS only (grey cloud)** |
| `nova-trade` | CNAME | `87f05ccdf88c9d1c.vercel-dns-017.com` | Recreate — **DNS only (grey cloud)** |
| `pulse` | CNAME | `ae9a353760e6f655.vercel-dns-017.com` | Recreate — **DNS only (grey cloud)** |
| `solbot` | CNAME | `65b8de5a4832e347.vercel-dns-017.com` | Recreate — **DNS only (grey cloud)** |
| `solweb` | CNAME | `44d628c5b7ee4224.vercel-dns-017.com` | Recreate — **DNS only (grey cloud)** |
| `_dmarc` | TXT | `v=DMARC1; p=none;` | Recreate as-is |

No MX records exist, so there is no mail delivery to break. No CAA records, so
Cloudflare can issue certificates without one being added first.

Every sibling CNAME stays **grey cloud**. Proxying a hostname that points at
another provider's frontend puts Cloudflare in a path it was never meant to be
in; for `auth` specifically, proxying an auth provider's hostname breaks login
outright. Only the Worker's own hostnames - the apex and `www` - get proxied,
and binding them as Worker custom domains does that automatically.

## Order of operations

The order matters more than any individual step.

1. **Add the zone** in the Cloudflare dashboard (Add a site -> punyakrit.dev).
   Let it run its import scan.
2. **Diff the import against the table above.** Add by hand anything missing.
   Do this before step 3 - once nameservers move, a missing record is downtime,
   not a to-do.
3. **Change nameservers at Namecheap** to the pair Cloudflare assigns.
   The other zones on this account use `gemma.ns.cloudflare.com` /
   `moura.ns.cloudflare.com`; use whatever the dashboard shows for this zone.
4. **Wait for the registry**, not for your laptop. Resolver caches lag by up to
   a TTL (the SOA minimum here is 3601s, so about an hour):

   ```
   # The .dev registry itself. Note +authority, not +short: the registry answers
   # with a delegation (ANSWER: 0, AUTHORITY: 2), so +short prints nothing and
   # reads as failure.
   dig NS punyakrit.dev @ns-tld1.charlestonroadregistry.com +noall +authority

   # A public resolver that has already picked up the change.
   dig NS punyakrit.dev @1.1.1.1 +short
   ```

   Trust the first - it is the registry's own view and cannot be stale. The
   second confirms the change has propagated outward. Your local resolver is
   the least reliable of the three; do not use it to decide.
5. **Delete the apex A record and the `www` CNAME** listed above. A conflicting
   record makes the custom-domain binding fail rather than take over, and the
   error does not say so clearly.
6. **Bind the custom domains** to the Worker: Workers & Pages -> portfolio-website
   -> Settings -> Domains & Routes -> Add custom domain. Add both
   `punyakrit.dev` and `www.punyakrit.dev`. Cloudflare creates the proxied
   records itself.
7. **Recreate the apex/www redirect.** It does not carry over from Vercel. The
   canonical host is the apex (`SITE_URL` in `src/lib/seo.ts`, and
   `metadataBase` in `src/app/layout.tsx`), so the rule is www -> apex.

   Rules -> Redirect Rules -> Create rule:
   - If: `Hostname equals www.punyakrit.dev`
   - Then: Dynamic redirect, 301, expression
     `concat("https://punyakrit.dev", http.request.uri.path)`
   - **Tick "Preserve query string".** The template leaves it off. Without it
     `?ref=...` and any OAuth callback carrying state is silently truncated -
     the redirect still looks like it works, which is what makes it expensive.

## What does NOT need changing

The domain is not changing, so webhooks and OAuth callback URLs registered
against `punyakrit.dev` stay valid. Do not repoint them.

## Verifying after cutover

```
dig NS punyakrit.dev @ns-tld1.charlestonroadregistry.com +noall +authority
curl -sI https://punyakrit.dev/ | head -1
curl -sI https://www.punyakrit.dev/?a=1 | grep -i location   # must keep ?a=1
curl -sI https://auth.punyakrit.dev/ | head -1               # sibling still resolves
```
