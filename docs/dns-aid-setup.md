# DNS records for AI agent discovery (DNS-AID)

These records let agents discover the site's AI entry points from DNS alone, before making a single HTTP request. They are DNS configuration and cannot ship from the repo.

**Status as of 2026-08-16: both records are published and resolve. DNSSEC does not validate. One action is outstanding, and it is at the registrar, not in the zone.** `pnpm smoke` now checks both halves.

## Current state, verified over DoH and RDAP

The records exist and answer correctly:

```
_index._agents.thehackathonplaybook.dev.  300  IN  HTTPS  1 thehackathonplaybook.dev. alpn=h2
_mcp._agents.thehackathonplaybook.dev.    300  IN  HTTPS  1 thehackathonplaybook.dev. alpn=h2
```

The zone is signed, but the delegation is not. Cloudflare publishes a KSK and a ZSK for the zone (`dig DNSKEY`, or the DoH query below, returns `257 3 13 ...` and `256 3 13 ...`), and the `.dev` registry says so directly:

```json
"secureDNS": { "delegationSigned": false, "zoneSigned": true }
```

No DS record exists at the parent, so a validating resolver has no path from the `.dev` trust anchor down to this zone and treats every answer as unsigned. Both Cloudflare's and Google's public resolvers return `AD: false` for this domain while returning `AD: true` for a control zone such as `cloudflare.com`. That is exactly the readiness scanner's finding: the records are found, the data is not authenticated.

Signing the zone is only half of DNSSEC. Until the DS record reaches the registry, the signatures are unverifiable and the scan keeps failing.

## The outstanding action: get the DS record to the registry

The domain is registered with Cloudflare Registrar (RDAP registrar handle 1910, `CloudFlare, Inc.`) and uses Cloudflare nameservers, so the DS submission is meant to happen automatically when DNSSEC is switched on. It has not: the registry's last change predates the day DNSSEC was enabled here.

1. **Cloudflare dashboard > the zone > DNS > Settings > DNSSEC.** Read the actual state rather than assuming it is on. Signed-but-undelegated usually shows as pending DS submission.
2. If it reports pending, the DS was never accepted by the registry. Toggling DNSSEC off and back on re-triggers the submission for Cloudflare Registrar domains. Disabling DNSSEC on a zone whose delegation is already insecure changes nothing for resolvers, so this is safe here. It would **not** be safe on a zone with a live DS, where removing the key before the DS expires makes the domain unresolvable for validating clients.
3. If the dashboard offers the DS record for manual entry, it belongs in the registrar's DNSSEC section for this domain. Same account, different product: **Domain Registration > Manage Domains > thehackathonplaybook.dev**.
4. Registry propagation takes minutes to hours. `delegationSigned` flipping to `true` in RDAP is the authoritative confirmation; the `AD` flag follows once resolvers' cached negative-DS proofs expire.

## Records

Applied and verified live. Nothing here needs to change to fix the scan.

| Type | Name | Priority | Target | SvcParams |
| --- | --- | --- | --- | --- |
| HTTPS | `_index._agents` | 1 | `thehackathonplaybook.dev.` | `alpn="h2"` |
| HTTPS | `_mcp._agents` | 1 | `thehackathonplaybook.dev.` | `alpn="h2"` |

In the Cloudflare UI: Type `HTTPS`, Name exactly `_index._agents` (Cloudflare appends the zone), Priority `1`, Target `thehackathonplaybook.dev.`, `alpn` set to `h2`. Leave proxy status DNS-only (grey cloud); these are discovery pointers, not traffic. TTL Auto (300s) is fine, they change roughly never.

There is deliberately no `_a2a._agents` record. Nothing here speaks the A2A protocol, and advertising an endpoint that does not exist is worse than NXDOMAIN. See `docs/agent-readiness.md` for the full list of things skipped on principle.

## What the spec actually says

Checked against `draft-mozleywilliams-dnsop-dnsaid-02` (27 May 2026, an individual Internet-Draft with no IETF standing) and the scanner's own skill document. This resolves the open verification item that the earlier version of this file carried.

- **Owner names match.** The draft defines `_index._agents.example.com` for an organizational registry, plus per-agent names and `_agents-challenge` for domain control validation. The `_index` and `_mcp` labels in use are correct.
- **Record type.** The draft uses SVCB (type 64) throughout. The published records are HTTPS (type 65), which is SVCB-compatible and which the scanner accepts explicitly ("ServiceMode SVCB/HTTPS records"). It found them, so this is not the failing half. Not worth churning production DNS over.
- **DNSSEC is a SHOULD, not a MUST**, in the draft's own words: records SHOULD be signed for data origin authentication, and only TLSA records MUST be. The scanner is stricter than the draft, and validating consumers are told to refuse bogus records, so signing is still the right call.
- **The richer SvcParamKeys are not usable yet.** The draft proposes `cap`, `cap-sha256`, `well-known`, `bap`, `policy`, and `realm` alongside standard `alpn`, `port`, and the address hints. None are IANA-registered, and the draft says experimental parameters must be expressed as `keyNNNNN` until they are. No number is assigned, so there is nothing interoperable to publish. Revisit if the draft advances: `well-known=mcp/server-card.json` on the `_mcp` record would be a genuine improvement, since that document already exists.

## Verify

```bash
pnpm smoke
```

The DNS-AID section checks both records and the `AD` flag, and tells you which half is broken. To check by hand without `dig` (Windows has no `dig`):

```bash
curl -s -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=_index._agents.thehackathonplaybook.dev&type=HTTPS"
curl -s -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=_mcp._agents.thehackathonplaybook.dev&type=HTTPS"
```

Expect `"Status":0` and an `Answer` entry, not NXDOMAIN.

```bash
curl -s -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=thehackathonplaybook.dev&type=SOA"
```

`"AD":true` is the goal. It is currently `false`.

```bash
curl -sL "https://rdap.org/domain/thehackathonplaybook.dev" | tr ',' '\n' | grep -i -A1 secureDNS
```

`"delegationSigned":true` is the registry-side proof that the DS landed.

```bash
curl -s -X POST https://isitagentready.com/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url":"https://thehackathonplaybook.dev"}'
```

The scanner passes when `checks.discoverability.dnsAid.status` is `"pass"`.
