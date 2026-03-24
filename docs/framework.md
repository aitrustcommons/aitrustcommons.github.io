---
title: "Governance Framework: Cross-Provider AI Agent Compliance"
description: "Four pillars of cross-provider AI governance: Standards Mapping, Policy-as-Code, Cross-Provider Audit Trails, and OWASP Validation. Open source, Apache 2.0."
hide:
  - navigation
---

# Governance Framework

AI Trust Commons is building the cross-provider governance layer that no single vendor will build. Every major cloud vendor publishes AI agent governance guidance for their own platform. None addresses what happens at the seams between providers.

---

## Four Pillars

<div class="grid cards" markdown>

-   :material-link-variant:{ .lg .middle } __Standards Mapping__

    ---

    Authoritative crosswalk across OWASP Top 10 for Agentic Applications, NIST AI RMF, and SOC 2. Implement one control, get credit across multiple audits.

    The standards landscape for AI agents is fragmented. NIST publishes the AI Risk Management Framework. OWASP publishes the Top 10 for Agentic Applications. SOC 2 auditors ask their own questions. AI Trust Commons maps these standards to each other so that a single technical control can satisfy requirements across multiple frameworks.

-   :material-lightning-bolt:{ .lg .middle } __Policy-as-Code__

    ---

    Machine-readable compliance that operates at AI speed. Governance as a guardrail agents run alongside, not a gate teams stop and open.

    Standards bodies write governance frameworks in natural language. No system can implement natural language automatically. Policy-as-Code bridges the gap between governance intent and technical enforcement by expressing compliance requirements in machine-readable formats that agents can evaluate in real time.

-   :material-file-document-outline:{ .lg .middle } __Cross-Provider Audit Trails__

    ---

    Structured logs of what agents did, what data they accessed, and why, in a standard format that works across AWS, Azure, GCP, and hybrid environments.

    Microsoft's MCP Gateway handles routing within Azure. Google's Agent Builder governs agents on Vertex AI. AWS Bedrock has its own guardrails. Each generates logs in its own format. AI Trust Commons defines a cross-provider audit trail format that lets enterprises trace agent behavior across all environments.

-   :material-shield-check:{ .lg .middle } __OWASP Validation__

    ---

    Automated validation against the OWASP Top 10 for Agentic Applications, from agent goal hijack to cascading failures.

    The OWASP Top 10 for Agentic Applications identifies the most critical security risks for autonomous AI systems. AI Trust Commons provides automated validation tooling that tests agent deployments against these benchmarks before and during production operation.

</div>

---

## Open Source

AI Trust Commons is licensed under Apache 2.0. The governance framework, policy templates, and validation tools are all open source.

[View on GitHub :material-github:](https://github.com/aitrustcommons/governance-framework){ .md-button .md-button--primary }
