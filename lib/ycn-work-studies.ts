/**
 * YCN Labs Work — four detailed, evidence-conscious case studies.
 * Each entry describes an actual YCN internal build or an independently authored
 * concept demonstration. Never silently promote a concept to client work.
 */
export type WorkScene = 'internal' | 'website' | 'requests' | 'quotes';

export interface WorkStudy {
  slug: string;
  scene: WorkScene;
  index: string;
  category: string;
  status: 'INTERNAL BUILD · IN DEVELOPMENT' | 'INDEPENDENT CONCEPT · DEMONSTRATION';
  heading: string;
  kicker: string;
  lead: string;
  audience: string;
  problem: string;
  designQuestion: string;
  decisions: readonly { title: string; explanation: string }[];
  experience: string;
  boundary: string;
  nextValidation: string;
  resultLabel: string;
  resultText: string;
  disclaimer: string;
}

export const workStudies: readonly WorkStudy[] = [
  {
    slug: 'ycn-labs-website', scene: 'internal', index: '01', category: 'OWN WEBSITE',
    status: 'INTERNAL BUILD · IN DEVELOPMENT',
    heading: 'An enquiry deserves a clear answer.',
    kicker: 'YCN Labs / Independent internal work',
    lead: 'Our own website is the first project we can talk about in detail. The visible pages are only half the job; the other half is what happens after someone presses Send.',
    audience: 'A visitor who wants to explain a business problem without writing a technical brief.',
    problem: 'A friendly contact form means little if the visitor sees a success message and the enquiry was never saved. Notifications can also fail independently of storage.',
    designQuestion: 'What should a visitor see if storage works, email does not, or nothing can be saved?',
    decisions: [
      { title: 'Confirm what was accepted', explanation: 'The interface should distinguish a stored request from a failed submission. A notification attempt by itself is not a receipt.' },
      { title: 'Separate storage from email', explanation: 'An email outage should not turn an already recorded enquiry into an invisible failure.' },
      { title: 'Make recovery an operational task', explanation: 'Error handling is not finished until a responsible person can find and address pending enquiries.' },
    ],
    experience: 'Explore the three possible outcomes in the simulated enquiry below. It does not send data or test production services.',
    boundary: 'This is an internal build under development. Its visible simulation explains design intent; real deployment and production recovery must be verified separately.',
    nextValidation: 'Current-version end-to-end test with actual configured services, inbox receipt, failure recovery, phone testing and release checks.',
    resultLabel: 'What the case study demonstrates',
    resultText: 'A straightforward interface can explain complicated reliability choices without exposing a visitor to backend jargon.',
    disclaimer: 'Internal project in development. No claim of production uptime, customer results or completed launch.',
  },
  {
    slug: 'service-business-website', scene: 'website', index: '02', category: 'BUSINESS WEBSITE',
    status: 'INDEPENDENT CONCEPT · DEMONSTRATION',
    heading: 'Answer the question before the call.',
    kicker: 'Studio concept / Customer clarity',
    lead: 'Imagine a local service business whose customers ask the same questions every day: What do you do? When are you available? How do I request a visit?',
    audience: 'An owner-led service business that wants enquiries to begin with the right information.',
    problem: 'A homepage that says “Welcome” but hides the service, hours and next step sends visitors back to the phone to ask basic questions.',
    designQuestion: 'Could one well-organized page make the next action obvious without building a booking platform?',
    decisions: [
      { title: 'Lead with the service', explanation: 'Tell visitors what can be requested before introducing the business history.' },
      { title: 'Keep practical details visible', explanation: 'Show service categories and sample operating hours close to the enquiry action. These are example details, not a real business listing.' },
      { title: 'Ask for less', explanation: 'The first enquiry can be a lightweight request. Scheduling, payments and customer accounts are not assumed.' },
    ],
    experience: 'Use the demo to choose a service and preview the information a visitor would share. Nothing is booked or transmitted.',
    boundary: 'A website cannot guarantee a sale or a search ranking. Real opening times, service areas, brand images and contact details would come from the owner.',
    nextValidation: 'Interview prospective customers, test on their phones, and verify that people find the required information without guidance.',
    resultLabel: 'What a finished engagement could aim for',
    resultText: 'Visitors understand the offering and know how to ask for help. That is the objective—not a fabricated conversion uplift.',
    disclaimer: 'Self-initiated website concept. Not a commissioned customer project and not a live booking service.',
  },
  {
    slug: 'request-workspace', scene: 'requests', index: '03', category: 'WEB APPLICATION',
    status: 'INDEPENDENT CONCEPT · DEMONSTRATION',
    heading: 'Every request needs an owner.',
    kicker: 'Studio concept / Team workflow',
    lead: 'A request arrives in a message. Someone promises to follow up. Another person assumes it has been handled. Nobody knows the current state.',
    audience: 'Small operations teams coordinating service requests or quotations.',
    problem: 'Messages scattered across chat and spreadsheets are hard to hand over, especially when several people are responsible for different steps.',
    designQuestion: 'What is the smallest useful screen that makes responsibility and status clear?',
    decisions: [
      { title: 'Show the next action', explanation: 'A request card should answer who owns it, where it stands and what happens next—not just show an ID.' },
      { title: 'Use plain statuses', explanation: 'Start with New, Assigned and Replied. Add more complexity only when the real process requires it.' },
      { title: 'Avoid software for its own sake', explanation: 'For a few requests each week, a shared sheet and a consistent routine might be enough.' },
    ],
    experience: 'Move a sample request through its stages. These changes are local to your browser; there is no shared database or team account behind this concept.',
    boundary: 'A production version would require permissions, access control, imports, a change history and failure handling appropriate to the business.',
    nextValidation: 'Map one team’s actual handoffs; test whether the right person can find and finish a request without extra explanations.',
    resultLabel: 'What this demonstration proves',
    resultText: 'A clear status can help people understand a workflow. It does not prove a deployed multi-user application or measured time savings.',
    disclaimer: 'Independent interactive concept; illustrative requests only. No customer records or external services.',
  },
  {
    slug: 'quotation-builder', scene: 'quotes', index: '04', category: 'AUTOMATION CONCEPT',
    status: 'INDEPENDENT CONCEPT · DEMONSTRATION',
    heading: 'Less copying. A clearer quote.',
    kicker: 'Studio concept / Repeatable work',
    lead: 'For businesses quoting similar jobs, the same details can be retyped from a message into a document every time. A small guided workflow may do more than a large system.',
    audience: 'Service teams preparing repeat quotations from agreed rates.',
    problem: 'Prices, quantities and descriptions are copied manually. That creates inconsistent documents and makes changes harder to review.',
    designQuestion: 'Could an editable item list generate a readable preview before any quote is sent?',
    decisions: [
      { title: 'Keep the rates editable', explanation: 'Businesses own their price lists. A system should not silently guess charges or tax treatment.' },
      { title: 'Review before sending', explanation: 'The final document is a human approval point, not an automatic promise to a customer.' },
      { title: 'Start with the repeatable part', explanation: 'A small calculator may be useful first. PDF export, accounts and integrations need separate scope.' },
    ],
    experience: 'Adjust the sample service, quantity and rate. The preview updates immediately in your browser; nothing is stored or sent.',
    boundary: 'Sample rupee figures are placeholders, not YCN pricing or a customer quote. Taxes, discounts, legal wording and approval rules are intentionally excluded.',
    nextValidation: 'Review the price-list structure with a real business, test tricky cases and confirm who approves and sends the final quote.',
    resultLabel: 'What a thoughtful first version could deliver',
    resultText: 'A repeatable, reviewable way to prepare common quotes—if actual business rules support the investment.',
    disclaimer: 'Independent interactive concept. Numbers are user-editable sample values; no quotation is issued.',
  },
] as const;

export function getWorkStudy(slug: string): WorkStudy | undefined {
  return workStudies.find((item) => item.slug === slug);
}
