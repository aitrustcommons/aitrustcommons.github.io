# CONTEXT.md — What Is AI Trust Commons and Why Does It Exist

## The Problem

AI agents are proliferating faster than any prior technology category. 80% of Fortune 500 companies deploy active AI agents, but only 14.4% go live with full security and IT approval. 88% have experienced confirmed or suspected agent security incidents.

Every major cloud vendor publishes AI agent governance guidance for their own platform. Microsoft's MCP Gateway handles routing within Azure. Google's Agent Builder governs agents on Vertex AI. AWS Bedrock has its own guardrails. Each solves a real problem. None addresses what happens at the seams between providers.

Meanwhile, standards bodies (NIST, OWASP, EU AI Act) are writing governance frameworks, but in natural language that no system can implement automatically. The gap between governance intent and technical enforcement is growing.

## What AI Trust Commons Is

An open-source initiative building the cross-provider governance layer that's missing. Think of it as the connective tissue between what governments and organizations want AI to do (governance intent) and what AI systems actually do (technical enforcement).

Four pillars:
1. **Standards Mapping** — Crosswalk across OWASP Top 10 for Agentic Applications, NIST AI RMF, SOC 2, EU AI Act
2. **Policy-as-Code** — Machine-readable compliance that operates at AI speed
3. **Cross-Provider Audit Trails** — Structured logs across AWS, Azure, GCP
4. **OWASP Validation** — Automated validation against agentic security benchmarks

## The "From Instinct to Intent™" Series

The founder, Nikhil Singhal, is publishing a series of articles and eventually a book under the trademark "From Instinct to Intent™." The core thesis: the bottleneck in AI is no longer the technology. It's humanity's ability to discover and express intent — what we actually want AI to do — in forms that machines can act on faithfully. This applies at every scale: an individual talking to ChatGPT, a hospital deploying diagnostic AI, a government writing AI regulation.

The first installment is a 5,500-word manifesto titled "Discovering Intent: The Journey That Starts Before You're Ready." It will be published on:
- **Zenodo** (DOI, timestamp, citability)
- **Medium** (SEO, organic reach) — @nikhilsinghal-ai-trust-commons
- **aitrustcommons.org** (institutional credibility) — THIS SITE

## Standards Body Engagement

AI Trust Commons actively engages with:
- **NIST**: Public comment submitted to CAISI RFI on AI Agent Security (DOI: 10.5281/zenodo.18903117). Listening session request due March 20.
- **OWASP**: Contributing to MCP Top 10 and Agentic Security Initiative
- **EU AI Act**: Article 50 transparency compliance tooling
- **NCCoE**: Identity and Authorization concept paper due April 2

## The Founder

Nikhil Singhal — 25 years engineering leadership at Microsoft, T-Mobile, AT&T, Expedia Group, Hitachi Consulting. Currently building AI-powered products daily (8 shipped in 3 months) and publishing on AI governance. Based in Seattle/Redmond, WA.

- LinkedIn: linkedin.com/in/nikhilsinghal
- GitHub: github.com/nikhilsi
- Email: nikhil@aitrustcommons.org
- Medium: nikhilsinghal-ai-trust-commons.medium.com

## Related Repos

- **github.com/aitrustcommons/governance-framework** — The technical framework (Apache 2.0)
- **github.com/aitrustcommons/aitrustcommons.github.io** — This website
- **github.com/nikhilsi/ns-2026-the-big-push** — Private ops repo (not accessible to this instance)
