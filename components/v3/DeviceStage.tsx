// YCN-V3-UI hero visual: an illustrative laptop + phone. A customer sends a request from
// the phone; it lands on the business's requests list and moves New → Assigned → Reply sent.
// Pure CSS animation (styles in app/globals.css, "HERO DEVICE STAGE"); nothing is sent anywhere.

const ROWS = [
  { initials: "RK", who: "Ravi K.", req: "AC repair quote", status: "Assigned · Arjun" },
  { initials: "MT", who: "Meena T.", req: "Bulk order, 200 boxes", status: "Call back today" },
  { initials: "IA", who: "Imran A.", req: "Website redesign", status: "Reply sent" },
];

export const DEVICE_STAGE_LABEL =
  "Demonstration: a customer sends a request from a phone. It appears on the business's requests list as New, then Assigned, then Reply sent.";

export function DeviceStage() {
  return (
    <figure className="v3-stage-wrap">
      <div className="v3-stage" role="img" aria-label={DEVICE_STAGE_LABEL}>
        <div className="v3-laptop" aria-hidden="true">
          <div className="v3-screen">
            <div className="v3-app">
              <div className="v3-sidebar">
                <span className="v3-nav is-on"><i />Requests</span>
                <span className="v3-nav"><i />Customers</span>
                <span className="v3-nav"><i />Settings</span>
              </div>
              <div className="v3-main">
                <div className="v3-apphead">
                  <span>Requests</span>
                  <small>Today</small>
                </div>
                <div className="v3-row v3-row-new v3-anim-arrive">
                  <span className="v3-av">PS</span>
                  <span className="v3-who">Priya S.</span>
                  <span className="v3-req">Catering for 40, Saturday</span>
                  <span className="v3-pills">
                    <span className="v3-pill v3-pill-new">New</span>
                    <span className="v3-pill v3-pill-assigned">Assigned · You</span>
                    <span className="v3-pill v3-pill-sent">Reply sent</span>
                  </span>
                </div>
                {ROWS.map((r) => (
                  <div className="v3-row" key={r.who}>
                    <span className="v3-av">{r.initials}</span>
                    <span className="v3-who">{r.who}</span>
                    <span className="v3-req">{r.req}</span>
                    <span className="v3-pills">
                      <span className="v3-pill">{r.status}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="v3-laptop-base" />
        </div>

        <div className="v3-phone" aria-hidden="true">
          <div className="v3-phone-screen">
            <span className="v3-status">9:41</span>
            <span className="v3-ptitle">Tell us what you need</span>
            <span className="v3-field"><small>Request</small>Catering for 40, Saturday</span>
            <span className="v3-field"><small>Name</small>Priya S.</span>
            <span className="v3-field"><small>Phone</small>98xxx xxxxx</span>
            <span className="v3-send v3-anim-press">Send request</span>
          </div>
        </div>

        <span className="v3-signal v3-anim-travel" aria-hidden="true" />
      </div>
      <figcaption className="mt-[var(--space-2)] type-caption text-[var(--text-secondary)]">
        Demonstration screens. Names and requests are illustrative.
      </figcaption>
    </figure>
  );
}
