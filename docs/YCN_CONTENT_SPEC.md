# YCN Labs — Content Specification

**Revision:** 1.2  
**Voice:** clear, confident, specific, human, short. Business language first; technical depth later.

## 1. Writing rules

Prefer specific actions and outcomes over agency clichés.

Avoid first-reading phrases such as: cutting-edge, seamless, empower, leverage, bespoke, transformative, next-generation, world-class, digital ecosystem, game-changing, “digital transformation.”

Do not make factual promises unless `YCN_CLAIMS_AND_PROOF.md` allows publication.

## 2. Navigation

*(Ratified per DECISION-039 on 2026-09-21)*  
`Work · What We Solve · How We Work · About · Start a Project`

`Engineering` remains accessible as secondary/depth navigation, but never becomes the primary barrier a non-technical visitor must understand.  
*(Historical route `/what-we-build` is superseded by `/what-we-solve` once that implementation phase is reached).*

## 3. Home

*(Ratified per DECISION-040 on 2026-09-21)*

### HERO-01

**H1 [RATIFIED]:** Websites and software. Built around your business.  
*(Candidate alternative 'Build what moves your business forward.' REJECTED / SUPERSEDED on 2026-09-21).*

**Sub [RATIFIED]:** We turn business problems into digital products that help customers act, teams work clearly, and the business keep moving.

**CTA:** Start a Project  
**Secondary:** See what we build  
**Reassurance:** You don’t need a technical brief to start.

### STATEMENT-01

**H2 [RATIFIED]:** Your customers shouldn't need an explanation.  
**Support [RATIFIED]:** A good product makes the next step clear.

### PATHS-01 / NEEDS FINDER

**H2 [RATIFIED]:** What would you like to make easier?

- **Help customers find my business** — Build a clear digital presence people can understand and act on.
- **Make enquiries, bookings or orders easier** — Give customers a simpler path from interest to action.
- **Reduce repetitive work** — Connect information and remove avoidable manual steps where it makes sense.
- **Build a product** — Turn an idea or business process into a web, mobile or SaaS product.
- **Not sure yet?** Tell us what happens today.

### THE PRODUCT AS PROTAGONIST — FOUR CHAPTER CLUSTER

*(The phone/device treatment is strictly bounded to these four chapters per DECISION-041; single-device gimmick ends here).*

#### CHAPTER 01 — Discovery
**Headline [RATIFIED]:** Be understood.  
**Support [RATIFIED]:** Make what you offer clear from the first screen.  
*(Product screen: Discovery state — business name, clear offering, location/hours, action prompt).*

#### CHAPTER 02 — Action
**Headline [RATIFIED]:** Make action easy.  
**Support [RATIFIED]:** From interest to enquiry, booking or order — without unnecessary steps.  
*(Product screen: Customer action state — request form, availability check, clear submission).*

#### CHAPTER 03 — Visibility & Ownership
**Headline [RATIFIED]:** Make every request visible.  
**Support [RATIFIED]:** Give every request an owner, a next step and a clear status.  
*(Product screen: Business intake queue — new request arrives, assigned, status tracked).*

#### CHAPTER 04 — Continuity
**Headline [RATIFIED]:** Keep the work moving.  
**Support [RATIFIED]:** Build the product so the experience stays useful after launch — not just on launch day.  
*(Product screen: Operational stability state — system running, monitored, dependable).*

*(Note: Proposed Chapter 05 "Room for what comes next" was dropped from the phone cluster per DECISION-041).*

### EDITORIAL HAND-OFF & RESET

**Lead [RATIFIED]:** The product people see is only the beginning.  
**Support [RATIFIED]:** What happens after someone acts matters just as much.

### LAPTOP PORTAL & INSIDE-PRODUCT EXPERIENCE

**Headline [RATIFIED]:** Simple outside. Structured inside.  
**Support [RATIFIED]:** Customers get a clear experience. Your team gets the information, ownership and next step behind it.

- **Customer-Side Heading [RATIFIED]:** Make the next step obvious.
- **Business-Side Heading [RATIFIED]:** Make the next step visible.

### CONNECTED FLOW & SYSTEM ACTION

**Lead [RATIFIED]:** One action. A clear next step.  
*(Visualizes requests flowing smoothly into clear ownership, action, and verified business outcome).*

### QUIET CLOSE

**H2 [RATIFIED]:** What should work better next?  
**Support [RATIFIED]:** Start with the problem. We'll work out what the right product should be.  
**Primary CTA:** Start a Project  
**Descriptor:** Software, engineered to hold up.

### HOME — Work

Render only work items whose classification/stage/evidence is allowed by the Claims register. If no item qualifies, use a truthful “What we are building” section rather than inventing client proof.

### HOME — Process

Talk → Understand → Plan → Design → Build → Test → Launch → Improve

### HOME — Closing CTA

**H:** Tell us what you’re trying to improve.

**Body:** You don’t need to know whether the answer is a website, app or software system. Tell us what is happening today and what you want to change.

**CTA:** Start a Project

## 4. What We Build

**H1:** What are you trying to change?

### Need 1 — Customers need to find me
**Capability:** Websites & digital presence  
**Plain explanation:** Make it easier for people to understand what you offer and contact you.

### Need 2 — Customers need an easier way to act
**Capability:** Customer experiences  
**Plain explanation:** Enquiries, bookings, ordering, portals and other clear customer journeys.

### Need 3 — My team does too much manually
**Capability:** Business systems & automation  
**Plain explanation:** Dashboards, workflows, integrations and tools built around how the work actually happens.

### Need 4 — I have a product idea
**Capability:** Software products  
**Plain explanation:** Web apps, mobile products and SaaS built from a useful first version outward.

### Need 5 — I need something specific
**Capability:** Custom software  
**Plain explanation:** Start with the problem and design the appropriate system rather than forcing a standard package.

**Footer CTA:** Not sure which one you need? Tell us what is happening today.

## 5. Work

**H1:** We show our work honestly.

Classification definitions must be visible without hover-only dependence:

- **CLIENT WORK** — paid work performed for a real client and publishable with permission.
- **INTERNAL PRODUCT** — a product actually built/used by YCN.
- **CONCEPT BUILD** — an engineering/design demonstration, not a production client result.

Every item shows:

1. Context / business problem.
2. What YCN actually did.
3. Current stage.
4. Verified scope/evidence.
5. Limitations or targets clearly separated from achieved results.

Do not pre-fill real project names/statuses unless the register verifies them.

## 6. How We Work

**H1:** You know your business. We know technology.

- **Talk** — Tell us what is happening.
- **Understand** — We study the problem before choosing technology.
- **Plan** — We agree what should be built and what is out of scope.
- **Design** — You can see and review the experience before full implementation.
- **Build** — We engineer the agreed solution.
- **Test** — We check important behavior under real conditions.
- **Launch** — We put the approved version into production.
- **Improve** — Ongoing support/improvements happen according to the agreement.

**Reassurance:** You don’t need to arrive with a technical specification.

## 7. Engineering

**H1:** Simple for the user. Deliberate underneath.

Intro: Technical choices should follow the actual problem. This page explains the practices we use and the evidence available for this website/project; it must not turn targets into claims.

Sections:

- **Performance** — keep important experiences responsive on real devices/networks.
- **Accessibility** — design and test so more people can complete the journey.
- **Security** — use appropriate boundaries, validation, secret handling and least privilege.
- **Reliability** — handle errors, retries, fallbacks and recovery deliberately.
- **Architecture** — choose structure based on requirements, not fashion.
- **Testing** — verify the behavior that matters instead of relying on visual confidence.
- **Monitoring & operations** — know when a production path fails and who is responsible.
- **Handover** — documentation, ownership and support follow the actual agreement.

Only publish measured numbers/certification/conformance when the Claims register permits it.

## 8. About

**H1:** Technology should make a business easier to understand and easier to run.

YCN Labs starts with the business problem, then chooses the digital solution that fits. We are building the company to serve businesses taking a first step online and teams that have outgrown the way they work today.

We care about clarity on the surface and engineering discipline underneath. We do not present concepts as client work or future capabilities as services already proven.

Do not invent team size, years in business, client count, awards, offices, partnerships or founder history without verified facts.

## 9. Start a Project

**H1:** Tell us what you’re trying to improve.

**Sub:** You don’t need to know whether you need a website, app, automation or custom software. Tell us what happens today and what you want to change.

### Guided flow

1. **What would you like to improve?**  
   Get found · enquiries/bookings/orders · less manual work · build a product · something else · not sure
2. **What happens today?**  
   Free text.
3. **What would you like to change?**  
   Free text.
4. **How should we contact you?**  
   Use only channels YCN actually operates. Do not make WhatsApp mandatory unless operationally supported.
5. **Optional planning information**  
   Budget/timeline/project type may be offered as optional fields.

### Submission states

- **Submitting:** Sending your request…
- **Accepted:** We received your request. [Only add response-time wording if the Claims register permits it.]
- **Validation error:** Check the highlighted details and try again.
- **Temporary failure:** We could not accept your request safely. Your message has not been confirmed—please try again or use the listed contact route.

Never show success when only an email attempt occurred without durable acceptance.

## 10. FAQ

*(Ratified conservative copy per DECISION-040 on 2026-09-21; avoids unverified commitments, blanket monitoring promises, or informal claims)*

1. **I am not technical. Can I still start?**  
   Yes. Start with the problem in your business. We work out what kind of website, tool, or software makes sense after we understand what happens today.
2. **Do I need to know whether I need a website, an app, or a system?**  
   No. Most business owners know what is slow, lost, or painful in their day-to-day work. Deciding the right format is our job.
3. **Can YCN work with the tools and systems we already use?**  
   Yes. We look at what is already working first. We keep, connect, or replace only what makes business sense.
4. **I already have a website or software. Can you improve it?**  
   Yes, if improving it is sensible and cost-effective. If rebuilding from scratch would save you money and headaches in the long run, we explain exactly why before starting.
5. **How are cost and scope decided?**  
   Scope, technical complexity, risk, and ongoing support determine price. Scope and pricing are agreed before work begins. Changes are discussed before they affect cost.
6. **Who owns the finished work?**  
   Ownership and licensing terms are clearly specified in our written agreement before any work begins. You will always know exactly what code and assets belong to you.
7. **What happens after launch?**  
   Post-launch support depends on the agreed scope. We make the support arrangement clear before launch.
8. **What information should I bring to our first conversation?**  
   Just an honest description of what your business does, where friction or lost work happens today, and what you would like to work better.

## 11. Footer

**Primary:** YCN Labs — technology and software built around how businesses work.  
**Secondary:** Software, engineered to hold up.

Keep legal/contact/social links only where the underlying pages/accounts actually exist.

## 12. Candidate Copy Status

On 2026-09-21, the Owner officially ratified the refined vNext homepage candidate copy (recorded in `docs/YCN_DECISIONS.md` under DECISION-040). All ratified lines have been incorporated into their canonical positions in this specification above.

Historical/rejected candidate alternatives are tracked as struck in `docs/vnext/07_CONTENT_AND_MESSAGING_STANDARD.md` §13 for audit and continuity.
