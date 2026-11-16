/**
 * YCN Labs editorial content: PREPUBLICATION DRAFTS.
 * None is live until the Owner approves and status becomes `published`.
 * No CMS, database, API, tracking, dependency or third-party media is required.
 */
export type ArticleCategory = 'Website decisions' | 'Business workflows' | 'Project planning';
export type Block =
  | { kind: 'paragraph'; text: string }
  | { kind: 'heading'; title: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'example'; title: string; text: string }
  | { kind: 'question'; title: string; answer: string };
export type Article = {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  intro: string;
  takeaway: string;
  status: 'draft' | 'published';
  reviewedOn?: string;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: 'before-you-rebuild-your-business-website',
    title: 'Before you rebuild your website, check these six things',
    description: 'A simple way for a business owner to see whether the problem is the site, its message, or the path to enquiry.',
    category: 'Website decisions', status: 'draft',
    intro: 'A new website can be the right answer. But sometimes the old one is losing enquiries for reasons a rebuild alone will not fix. Start with what a visitor sees and tries to do.',
    takeaway: 'If the visitor cannot understand the offer or take the next step, begin there. New technology comes afterward.',
    body: [
      { kind: 'heading', title: 'First, use your site like a stranger would' },
      { kind: 'paragraph', text: 'Open your homepage on a phone. Do not explain the business to yourself. Give it a few moments, then ask: Could someone tell what you sell, who it is for and how to contact you? If those answers need a scroll through three paragraphs, the first screen is doing too little.' },
      { kind: 'list', items: [
        'The opening line names the actual service, not just “quality solutions”.',
        'The primary contact action is visible and understandable on a phone.',
        'A visitor can find operating area, hours or service boundaries when those matter.',
        'Buttons and navigation work without fiddly gestures or tiny targets.',
        'The site explains what happens after someone sends an enquiry.',
        'You can correct an outdated price, photo or service without losing control of the whole site.'
      ] },
      { kind: 'heading', title: 'Look at the enquiry path, not just the homepage' },
      { kind: 'paragraph', text: 'Follow one common question. For a repair business it might be “Do you visit my area?” For a training centre, “What happens after I enquire?” Start at the homepage and find the answer. Then try to contact the business. Count the places where you hesitate, have to guess, or are asked for unnecessary details.' },
      { kind: 'example', title: 'Example: a home-services business', text: 'Suppose the site looks polished but never mentions which neighbourhoods it serves. The visitor may leave without calling. A clear service-area section and an enquiry button near it might help more than a larger hero animation.' },
      { kind: 'heading', title: 'Decide what kind of change is actually needed' },
      { kind: 'list', items: [
        'If the message is unclear but the site works: start with content and page structure.',
        'If the site is difficult to use on a phone: address layout, loading and navigation.',
        'If staff cannot update information: fix the editing and ownership process.',
        'If enquiries are arriving but getting lost internally: improve the workflow behind the site.',
        'If the current platform prevents basic changes or breaks regularly: consider a rebuild with an explicit migration plan.'
      ] },
      { kind: 'heading', title: 'Ask for a specific proposal' },
      { kind: 'paragraph', text: 'A useful proposal should show what will be retained, what will change, which problems those changes address, what content you must supply and how the finished website will be tested. It should explain ownership, hosting and handover in writing.' },
      { kind: 'question', title: 'What should I bring to a first conversation?', answer: 'Your current site if you have one, two or three common customer questions, and the part of the enquiry process that frustrates you. You do not need to prepare a technical specification.' }
    ]
  },
  {
    slug: 'from-whatsapp-enquiries-to-a-clear-workflow',
    title: 'When customer requests live in WhatsApp, start with one clear list',
    description: 'A practical way to organize enquiries, owners, deadlines and follow-ups before investing in a custom app.',
    category: 'Business workflows', status: 'draft',
    intro: 'Messages are convenient for customers. They are less convenient when several people must remember who replied, what was promised and what still needs attention.',
    takeaway: 'Do not start by automating every conversation. First agree on the few details your team needs to see and act on.',
    body: [
      { kind: 'heading', title: 'The problem is usually the handoff' },
      { kind: 'paragraph', text: 'A customer asks for a delivery date. One employee checks stock, another sends a price, and the owner later asks whether the customer confirmed. All the information exists, but not in one place. The next action gets lost between conversations.' },
      { kind: 'heading', title: 'Define the smallest useful record' },
      { kind: 'list', items: [
        'Reference number: one identifier people can use to find the request.',
        'What was asked: a plain-language summary, not a long copied conversation.',
        'Owner: one person responsible for the next action.',
        'Status: New, Waiting on us, Waiting on customer, or Closed.',
        'Next action and date: the practical step that keeps the request moving.'
      ] },
      { kind: 'example', title: 'Example: a small distributor', text: 'A shopkeeper asks whether 20 boxes can be delivered this week. The request list records “20 boxes, delivery availability”, assigns it to Sales, and sets “Confirm stock by Tuesday”. Staff can still speak with the customer on WhatsApp; the shared list prevents the action from disappearing in chat.' },
      { kind: 'heading', title: 'Test the routine manually before automating it' },
      { kind: 'paragraph', text: 'Try the shared record for a short pilot using invented test entries or appropriately handled business information. Ask staff whether the statuses make sense and whether any fields are never used. A spreadsheet may be enough for a small team; a custom app becomes useful when several people need access controls, repeatable workflows or reliable integration with other systems.' },
      { kind: 'heading', title: 'Connect tools only after you know the process' },
      { kind: 'paragraph', text: 'The next step might be a web form feeding a request list and triggering an internal notification. It might instead be a better shared spreadsheet. Integration is not the goal; making ownership and next steps visible is the goal.' },
      { kind: 'list', items: [
        'Avoid promising automatic WhatsApp messages until the business has an approved provider and message permissions.',
        'Decide who can see each record and how long it should be retained.',
        'Keep a way to correct mistakes and recover from failed notifications.',
        'Measure whether fewer requests are left without a next action; do not assume software fixes human process by itself.'
      ] },
      { kind: 'question', title: 'When does a custom web app make sense?', answer: 'When a shared sheet has become difficult to control or your team needs repeatable permissions, views, integrations, auditability or guided actions. Choose the smallest version that solves one important failure first.' }
    ]
  },
  {
    slug: 'does-your-business-need-a-website-or-web-app',
    title: 'Do you need a website, a web app, or both?',
    description: 'Understand the difference through what your customers and employees actually need to do.',
    category: 'Website decisions', status: 'draft',
    intro: 'The words sound similar, but the decision is easier when you stop thinking about technology and look at the job someone needs to complete.',
    takeaway: 'Start with the person and the action. Choose the simplest tool that supports both.',
    body: [
      { kind: 'heading', title: 'A website helps people understand and act' },
      { kind: 'paragraph', text: 'A website explains your service, shows useful information and gives people a next step: call, request a quote, view a location or make an enquiry. It may have a form, but that does not automatically make it a complex application.' },
      { kind: 'example', title: 'A clinic explaining its services', text: 'Patients need to know which services are offered, where the clinic is, its hours and how to request a visit. A clear responsive website could meet that need without a login or dashboard.' },
      { kind: 'heading', title: 'A web app helps people do ongoing work' },
      { kind: 'paragraph', text: 'A web app is useful when staff or customers need to sign in, update records, track a task, assign responsibility or repeat an activity. The complexity should come from the work it supports, not from the desire to call something an app.' },
      { kind: 'example', title: 'A clinic organizing appointments', text: 'If reception staff need to reschedule appointments, see who is waiting and coordinate several people, a small internal application might help. That is a different problem from explaining the clinic to a new patient.' },
      { kind: 'heading', title: 'The three questions that settle most decisions' },
      { kind: 'list', items: [
        'Does the visitor mainly need information and a way to contact you? Start with a website.',
        'Does someone need to create, change and track records repeatedly? Consider a web app.',
        'Would a simpler tool or a better spreadsheet solve the issue first? Test that before paying for custom software.'
      ] },
      { kind: 'heading', title: 'Sometimes the right answer is both' },
      { kind: 'paragraph', text: 'A service company may need a public website where people request work and a private workspace where the team plans and responds. They can be designed as two parts of a coherent journey. You do not have to build both on day one.' },
      { kind: 'question', title: 'How should I explain my requirement?', answer: 'Describe what the visitor or employee does today, where the process becomes difficult, and what you want to happen instead. The technical format can be decided after that.' }
    ]
  },
  {
    slug: 'questions-before-hiring-a-website-developer',
    title: 'Seven questions to ask before hiring someone to build your website',
    description: 'A plain-language checklist covering scope, accounts, content, launch, support and ownership.',
    category: 'Project planning', status: 'draft',
    intro: 'The first decision is not which programming language the developer uses. It is whether you know what you are buying, what you need to provide and what happens when the work is finished.',
    takeaway: 'If you cannot explain the deliverables, costs, review steps and handover in ordinary words, clarify them before approving the project.',
    body: [
      { kind: 'heading', title: 'Ask these before agreeing to the project' },
      { kind: 'list', items: [
        'What problem will the new site solve, and what is explicitly outside the scope?',
        'Which pages, forms, integrations, copy and media are included?',
        'Who supplies the domain, hosting, photos, written content and third-party accounts?',
        'When can I see an actual preview and request corrections?',
        'What will be tested on phones and for accessibility before launch?',
        'What will be handed over, and what do the agreement and third-party licences say I own?',
        'Who will handle updates or technical problems after launch, and what does that cost?'
      ] },
      { kind: 'heading', title: 'Look for examples of the delivery process' },
      { kind: 'paragraph', text: 'It is useful to see an actual preview, an example handover checklist or a small demonstration of how a request flows through a website. A glossy screenshot alone does not explain how the finished site will work.' },
      { kind: 'example', title: 'Example: a local training business', text: 'The owner expects a course list, enquiry form, location details and the ability to change intake dates. A proposal should say whether the editing tools are included, who enters the initial course information and how the enquiry notifications will be tested. Those details often matter more than the number of animation effects.' },
      { kind: 'heading', title: 'Make account ownership explicit' },
      { kind: 'paragraph', text: 'Ask whose account will hold the domain, hosting, mail service and relevant subscriptions. Keep access recoverable under the business’s control, with roles and credentials handled securely. Your signed agreement should explain the rights in custom deliverables and any reusable or third-party components.' },
      { kind: 'heading', title: 'A useful handover should let the next person continue' },
      { kind: 'paragraph', text: 'A handover may include the approved source, deployment instructions, access inventory, agreed content, operating instructions and support arrangements. What is appropriate depends on the contract and the project; do not rely on a vague verbal promise of “full ownership”.' },
      { kind: 'question', title: 'Should I choose the cheapest quote?', answer: 'Compare what is actually included. A smaller well-scoped solution can be good value. A low number with no clear testing, handover or support expectations may create uncertainty later.' }
    ]
  }
];

export type GalleryCategory = 'Education' | 'Product walkthrough' | 'Studio' | 'Events';
export type GalleryItem = {
  id: string; category: GalleryCategory; title: string; summary: string;
  platform: 'youtube'|'instagram'; url: string; thumbnail: string; duration?: string;
  status: 'draft'|'verified'; relatedArticle?: string;
};

// Populate only with actual Owner-approved video URLs, thumbnails and claims.
export const galleryItems: GalleryItem[] = [];

export type StudioUpdate = {
  id: string; kind: 'Milestone'|'Studio note'|'Press'|'Event'|'Promotion';
  title: string; summary: string; date: string; proofUrl?: string;
  status: 'draft'|'verified';
};

// Do not invent achievements, media coverage, promotions, discounts or launch dates.
export const studioUpdates: StudioUpdate[] = [];

export const EDITORIAL_PREVIEW = process.env.YCN_EDITORIAL_PREVIEW === '1';
export function visibleArticles(): Article[] {
  return articles.filter(x => x.status === 'published' || EDITORIAL_PREVIEW);
}
export function getVisibleArticle(slug: string): Article | undefined {
  return visibleArticles().find(x => x.slug === slug);
}
export function verifiedGallery(): GalleryItem[] {
  return galleryItems.filter(x => x.status === 'verified' && allowedSocialUrl(x.url) && x.thumbnail.startsWith('/') && !x.thumbnail.startsWith('//'));
}
export function verifiedUpdates(): StudioUpdate[] {
  return studioUpdates.filter(x => x.status === 'verified' && Boolean(x.proofUrl));
}
export function allowedSocialUrl(input: string): boolean {
  try {
    const u = new URL(input);
    return u.protocol === 'https:' && [
      'youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be',
      'instagram.com', 'www.instagram.com'
    ].includes(u.hostname);
  } catch { return false; }
}
export function estimatedReadMinutes(post: Article): number {
  const body = post.body.flatMap(x => x.kind === 'list' ? x.items :
    x.kind === 'paragraph' ? [x.text] : x.kind === 'example' ? [x.text] :
    x.kind === 'question' ? [x.answer] : [x.title]).join(' ');
  return Math.max(2, Math.ceil((post.intro + ' ' + body).split(/\s+/).length / 190));
}
