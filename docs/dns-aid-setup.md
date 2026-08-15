# DNS records for AI agent discovery (DNS-AID)

The readiness scan probed `_index._agents.thehackathonplaybook.dev`, `_mcp._agents.…`, and `_a2a._agents.…` for SVCB/HTTPS records (RFC 9460) and got NXDOMAIN on all three. These records let agents discover a site's AI entry points from DNS alone, before making a single HTTP request.

This is DNS configuration and cannot ship from the repo. Apply the records below in the Cloudflare dashboard (**DNS > Records > Add record**). All of them are pure discovery pointers; nothing breaks if they are wrong, agents just fall back to HTTP discovery (the Link headers and `.well-known` documents this PR ships).

A note on spec maturity: the DNS-AID draft is young and was not reachable from the environment that authored this PR, so the record *names* below come from what Cloudflare's scanner actually probed, and the record *syntax* follows RFC 9460, which is stable. Before applying, skim the current draft (search the IETF datatracker for "DNS-AID" or "AI discovery SVCB") and prefer its parameter conventions if they have moved. The `dig` checks at the bottom verify exactly what the scanner probes.

## Records to create

Only two entry points exist after this PR (`_index` for the site itself, `_mcp` for the MCP server). Do not create `_a2a` unless a callable A2A agent endpoint ships later; advertising an endpoint that does not exist is worse than NXDOMAIN.

| Type | Name | Priority | Target | SvcParams |
| --- | --- | --- | --- | --- |
| HTTPS | `_index._agents` | 1 | `thehackathonplaybook.dev.` | `alpn="h2"` |
| HTTPS | `_mcp._agents` | 1 | `thehackathonplaybook.dev.` | `alpn="h2"` |

In the Cloudflare UI: Type `HTTPS`, Name exactly `_index._agents` (Cloudflare appends the zone), Priority `1`, Target `thehackathonplaybook.dev.`, and add the `alpn` parameter set to `h2`. Leave proxy status DNS-only (grey cloud); these are discovery records, not traffic.

TTL: Auto is fine (300s). These records change roughly never.

## DNSSEC

The discovery spec expects the zone to be signed so agents can trust the answers. In Cloudflare this is one toggle plus one registrar step:

1. **DNS > Settings > DNSSEC > Enable DNSSEC.**
2. Cloudflare shows a DS record; add it at the domain registrar (if the registrar is Cloudflare Registrar, this happens automatically).
3. Wait for the dashboard to report DNSSEC as active (can take up to the registrar's TTL).

## Verify

```bash
# each should return an HTTPS (type 65) record, not NXDOMAIN
dig +short HTTPS _index._agents.thehackathonplaybook.dev
dig +short HTTPS _mcp._agents.thehackathonplaybook.dev

# this one should stay NXDOMAIN on purpose (no A2A endpoint is published)
dig +short HTTPS _a2a._agents.thehackathonplaybook.dev

# DNSSEC: the ad (authenticated data) flag should be set
dig +dnssec thehackathonplaybook.dev SOA | grep -o "flags:[^;]*"
```
