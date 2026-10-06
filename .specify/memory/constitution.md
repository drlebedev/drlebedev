<!--
Sync Impact Report:
- Version change: None (Unratified Template) → 1.0.0
- List of modified principles:
  - [PRINCIPLE_1_NAME] → I. ASD-STE100 Communication Standard (NON-NEGOTIABLE)
  - [PRINCIPLE_2_NAME] → II. Visual Communication with Diagrams (NON-NEGOTIABLE)
  - [PRINCIPLE_3_NAME] → III. Google App Engine Free Tier Compliance
  - [PRINCIPLE_4_NAME] → IV. Multi-Target Crawler Optimization
  - [PRINCIPLE_5_NAME] → V. Accurate Professional Representation
- Added sections:
  - Technical and Hosting Constraints
  - Quality and Verification Standards
  - Governance
- Removed sections: None
- Follow-up TODOs: None
-->

# drlebedev.com Constitution

## Core Principles

### I. ASD-STE100 Communication Standard (NON-NEGOTIABLE)
All agents and documents in this project must use ASD-STE100 Simplified Technical English.
All text must follow these rules:
- Write short sentences. Sentences must contain less than 25 words.
- Use the active voice.
- Use clear and approved words.
- Do not use ambiguous words or slang.
- Write one instruction in each sentence.

Rationale:
ASD-STE100 removes confusion. It ensures clear communication between humans and automated agents.

### II. Visual Communication with Diagrams (NON-NEGOTIABLE)
Agents must use diagrams to communicate information where possible.
- Use Mermaid format for all text diagrams.
- Add diagrams to architecture specifications, workflows, and task designs.
- Show system states, data flow, and components with diagrams.
- Accompany diagrams with clear text explanations.

Rationale:
Diagrams show system structure fast. Humans and AI models understand diagrams with fewer errors.

### III. Google App Engine Free Tier Compliance
The system runs on the Google App Engine standard environment with the Python SDK.
The system must operate inside free tier resource limits:
- The system must not exceed daily free quotas.
- Keep instance memory usage low.
- Keep cold start latency short.
- Serve static assets efficiently to decrease egress bandwidth and CPU time.
- Do not run continuous background processes that consume paid hours.

Rationale:
The hosting budget is zero dollars. The application must remain available without cloud costs.

### IV. Multi-Target Crawler Optimization
The website must support three crawler types:
- Search engine crawlers (Google, Bing): Provide clean semantic HTML5, meta tags, sitemap.xml, and fast load speed.
- Social media crawlers (LinkedIn, Twitter/X): Provide Open Graph tags, Twitter card tags, and metadata images.
- Agentic and AI crawlers: Provide `llms.txt`, Schema.org JSON-LD structured data, and readable markdown text.

Rationale:
Kirill Lebedev must be discoverable by people, search engines, and artificial intelligence agents.

### V. Accurate Professional Representation
The website presents the professional profile and achievements of Kirill Lebedev.
- Information must be accurate, current, and verifiable.
- Structure content into clear sections: profile summary, experience, skills, and achievements.
- Use clean presentation without unnecessary visual clutter.
- Maintain accessibility standards across all screen sizes.

Rationale:
The primary mission of drlebedev.com is to communicate professional reputation and career achievements.

## Technical and Hosting Constraints
The application must follow these technical rules:
- Use Python on Google App Engine standard environment.
- Keep dependencies minimal to reduce deployment size and startup delay.
- Store configuration in standard configuration files such as `app.yaml`.
- Optimize caching headers for static assets.
- Validate local execution with the Google Cloud SDK before deployment.

## Quality and Verification Standards
Development work must pass these checks before release:
- Verify all documentation against ASD-STE100 rules.
- Include a Mermaid diagram in every technical specification and architectural plan.
- Verify that website pages validate with search engine and social media schema checkers.
- Test structured data and `llms.txt` files for agent crawlers.
- Test resource usage to confirm compliance with App Engine free quotas.

## Governance
This constitution is the supreme authority for the drlebedev.com repository.
- All proposals, specifications, code, and agent responses must comply with this document.
- Amendments require explicit approval from Kirill Lebedev.
- Version numbering follows Semantic Versioning:
  - MAJOR: Changes that break rules or redefine core principles.
  - MINOR: Additions of new principles or expanded guidelines.
  - PATCH: Clarifications, grammar fixes, and non-semantic text updates.
- All pull requests and specifications must verify compliance with this constitution.

**Version**: 1.0.0 | **Ratified**: 2026-10-06 | **Last Amended**: 2026-10-06
