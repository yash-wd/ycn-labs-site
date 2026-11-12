import Image from "next/image";

// YCN-V3-UI demonstration screens (illustrative; aria-hidden; nothing is interactive).
// Styles: app/globals.css "HOMEPAGE: demonstration screens".

export function RequestsShot() {
  return (
    <div className="v3-shot" aria-hidden="true">
      <div className="v3-shot-title"><span>Requests</span><small>Today</small></div>
      <div className="v3-row v3-row-new"><span className="v3-av">PS</span><span className="v3-who">Priya S.</span><span className="v3-req">Catering for 40</span><span className="v3-pills"><span className="v3-pill v3-pill-new">New</span></span></div>
      <div className="v3-row"><span className="v3-av">RK</span><span className="v3-who">Ravi K.</span><span className="v3-req">AC repair quote</span><span className="v3-pills"><span className="v3-pill">Assigned · Arjun</span></span></div>
      <div className="v3-row"><span className="v3-av">MT</span><span className="v3-who">Meena T.</span><span className="v3-req">200 boxes</span><span className="v3-pills"><span className="v3-pill">Call back today</span></span></div>
    </div>
  );
}

export function FlowShot() {
  return (
    <div className="v3-shot" aria-hidden="true">
      <div className="v3-shot-title"><span>New order</span><small>Automatic</small></div>
      <div className="v3-flow">
        <div className="v3-flow-step"><b>1</b>Order form received</div>
        <div className="v3-flow-arrow" />
        <div className="v3-flow-step"><b>2</b>Row added to the orders sheet</div>
        <div className="v3-flow-arrow" />
        <div className="v3-flow-step"><b>3</b>WhatsApp message to dispatch</div>
      </div>
    </div>
  );
}

export function SiteShot() {
  return (
    <div className="v3-shot" aria-hidden="true">
      <div className="v3-site">
        <div className="v3-site-bar"><i /><i /><i /><span>yourbusiness.in</span></div>
        <div className="v3-site-body">
          <strong>What you do, in one clear line.</strong>
          <span>Open today 9 am – 9 pm · Near the main market</span>
          <div className="v3-site-actions"><span>Call now</span><span>WhatsApp</span><span>Directions</span></div>
        </div>
      </div>
    </div>
  );
}

export function BeforeAfterShot() {
  return (
    <div className="v3-shot" aria-hidden="true">
      <div className="grid grid-cols-2 gap-3">
        {[
          { src: "/media/messy_desk_books_papers_iphone.jpg", label: "Before: scattered" },
          { src: "/media/clean_organised_laptop_desk.jpg", label: "After: organised" },
        ].map((p) => (
          <figure key={p.src} className="m-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
              <Image src={p.src} alt="" fill sizes="(max-width: 900px) 45vw, 260px" className="object-cover" />
            </div>
            <figcaption className="mt-1 text-[11px] text-[#94A3B8]">{p.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function IntakeShot() {
  return (
    <div className="v3-shot" aria-hidden="true">
      <div className="v3-shot-title"><span>Tell us what you need</span><small>Phone</small></div>
      <div className="v3-field"><small>Request</small>Catering for 40, Saturday</div>
      <div className="v3-field"><small>Name · Phone</small>Priya S. · 98xxx xxxxx</div>
      <div className="v3-send">Send request</div>
    </div>
  );
}

export function StatusShot() {
  return (
    <div className="v3-shot" aria-hidden="true">
      <div className="v3-shot-title"><span>Follow-up</span><small>This week</small></div>
      <div className="v3-row"><span className="v3-av">MT</span><span className="v3-who">Meena T.</span><span className="v3-req">200 boxes</span><span className="v3-pills"><span className="v3-pill">Call back today</span></span></div>
      <div className="v3-row"><span className="v3-av">IA</span><span className="v3-who">Imran A.</span><span className="v3-req">Website redesign</span><span className="v3-pills"><span className="v3-pill v3-pill-sent">Reply sent</span></span></div>
    </div>
  );
}

export function UpdateShot() {
  return (
    <div className="v3-shot" aria-hidden="true">
      <div className="v3-shot-title"><span>Weekly update</span><small>Illustrative</small></div>
      <div className="v3-flow-step"><b>✓</b>Done: enquiry form and requests list</div>
      <div className="v3-flow-step"><b>→</b>Next: WhatsApp notification</div>
      <div className="v3-flow-step"><b>?</b>Need from you: opening hours, 6 photos</div>
      <div className="v3-flow-step"><b>↗</b>Preview link to open on your phone</div>
    </div>
  );
}

/** How this site's own enquiry form behaves (Task 12, verified on staging). Not a demonstration. */
export function ProtectShot() {
  return (
    <div className="v3-shot" aria-hidden="true">
      <div className="v3-shot-title"><span>When someone sends an enquiry</span><small>This site</small></div>
      <div className="v3-flow">
        <div className="v3-flow-step"><b>1</b>Check the details and limit repeat sending</div>
        <div className="v3-flow-arrow" />
        <div className="v3-flow-step"><b>2</b>Save it before saying “received”</div>
        <div className="v3-flow-arrow" />
        <div className="v3-flow-step"><b>3</b>Email us; if email fails, keep it to resend</div>
      </div>
    </div>
  );
}
