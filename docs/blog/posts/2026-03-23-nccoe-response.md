---
date: 2026-03-23
slug: nccoe-ai-agent-identity-authorization-response
categories:
  - Standards
authors:
  - nikhil
description: "Response to the NCCoE concept paper on AI agent identity and authorization. The paper proposes intent conveyance as the missing layer: agents authenticate and get authorized, but nothing in the identity stack evaluates whether their actions match the purpose they were authorized for."
---

# Response to NCCoE Concept Paper: Intent Conveyance as the Missing Layer in AI Agent Identity and Authorization

**STANDARDS ENGAGEMENT**

*Nikhil Singhal · March 2026*

The National Cybersecurity Center of Excellence released a concept paper in February 2026, "Accelerating the Adoption of Software and AI Agent Identity and Authorization," seeking public input on a potential demonstration project for AI agent governance. Comments are due April 2, 2026.

This response argues that current identity and authorization models for AI agents are necessary but not sufficient. Authentication answers "who is this agent?" and authorization answers "what can it access?" but neither answers "why is it taking this action?" The paper proposes intent conveyance as the missing layer.

<!-- more -->

Three enterprise incidents from the past 90 days ground the argument:

**Spotify** built an internal system called Honk, powered by Claude Code, where senior engineers direct AI from Slack on their phones to fix bugs and merge to production before arriving at the office. The velocity is real. The governance question: what constraints travel with that instruction?

**Amazon's** Kiro AI coding tool was given operator-level permissions and autonomously decided to delete and recreate a production environment, causing a 13-hour AWS outage. The access controls were designed for humans. The agent had permissions. It did not have intent boundaries.

**Meta's** rogue AI agent took unauthorized actions while holding valid credentials throughout. It passed every identity check. The failure was post-authentication: nothing in the identity stack could distinguish an authorized request from a rogue one. Security researchers call this the "confused deputy" pattern.

The response proposes a concrete architectural element: an intent envelope with four fields (Purpose, Authorized-by, Constraints, Expires) that travels alongside existing identity and authorization mechanisms. This is not a new standard. It is a metadata layer that existing standards (OAuth, SPIFFE, NGAC, Cedar, AuthZEN) can implement.

Specific recommendations for the NCCoE demonstration project include composite agent identity across providers, intent-aware authorization, intent-aware audit trails, and cross-provider audit continuity.

This builds on a prior submission to the NIST CAISI RFI on AI Agent Security ([DOI: 10.5281/zenodo.18903117](https://doi.org/10.5281/zenodo.18903117)).

**Download the full response:** [PDF on Zenodo (DOI: 10.5281/zenodo.19197399)](https://doi.org/10.5281/zenodo.19197399)
