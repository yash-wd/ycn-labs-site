'use client';

import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import type { WorkScene } from '@/lib/ycn-work-studies';
import styles from './work.module.css';

const INR = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

function InternalDemo() {
  const [scenario, setScenario] = useState<'accepted' | 'email' | 'storage'>('accepted');
  const outcomes = {
    accepted: { title: 'Enquiry accepted', body: 'Design example: the request is stored, then notification is attempted.', state: 'Receipt can be shown' },
    email: { title: 'Notification unavailable', body: 'Design example: the stored request remains available for operational follow-up.', state: 'Stored request remains' },
    storage: { title: 'Storage unavailable', body: 'Design example: do not show a false confirmation. Preserve what the visitor typed.', state: 'No receipt shown' },
  } as const;
  const current = outcomes[scenario];
  return <div className={styles.demoArea}>
    <p className={styles.microHeading}>Choose a failure condition</p>
    <div className={styles.controlGroup} role="group" aria-label="Simulate an enquiry outcome">
      <button type="button" aria-pressed={scenario === 'accepted'} onClick={() => setScenario('accepted')}>Normal</button>
      <button type="button" aria-pressed={scenario === 'email'} onClick={() => setScenario('email')}>Email fails</button>
      <button type="button" aria-pressed={scenario === 'storage'} onClick={() => setScenario('storage')}>Storage fails</button>
    </div>
    <div className={styles.feedback} role="status" aria-live="polite"><small>{current.state}</small><h3>{current.title}</h3><p>{current.body}</p></div>
    <p className={styles.demoFoot}>Simulation only. No enquiry is submitted. Production behaviour requires separate verification.</p>
  </div>;
}

function ServiceWebsiteDemo() {
  const [service, setService] = useState('Small repair');
  const [day, setDay] = useState('Weekday');
  const [review, setReview] = useState(false);
  return <div className={styles.demoArea}>
    <div className={styles.exampleTitle}><small>EXAMPLE SERVICE PAGE</small><h3>Tell us what you need.</h3><p>Choose the kind of help and the time that works. In a real site, the owner supplies the actual availability.</p></div>
    <div className={styles.formGrid}>
      <label>Service<select value={service} onChange={e => { setService(e.target.value); setReview(false); }}><option>Small repair</option><option>Installation visit</option><option>Maintenance check</option></select></label>
      <label>Preferred timing<select value={day} onChange={e => { setDay(e.target.value); setReview(false); }}><option>Weekday</option><option>Weekend</option><option>Not sure yet</option></select></label>
    </div>
    <button className={styles.actionButton} type="button" onClick={() => setReview(true)}>Preview a request <ArrowUpRight size={16} strokeWidth={1.9} aria-hidden="true" /></button>
    <div className={styles.feedback} role="status" aria-live="polite">{review ? <><small>READY TO REVIEW · EXAMPLE ONLY</small><h3>{service}</h3><p>Preferred timing: {day}. A real site would confirm contact details and availability before sending.</p></> : <><small>A CLEAR NEXT STEP</small><h3>No account required to start</h3><p>Make the important information easy to find, then ask for only the details needed to respond.</p></>}</div>
    <p className={styles.demoFoot}>Concept. No real business, opening hours or booking service is represented. Nothing is sent.</p>
  </div>;
}

type RequestStatus = 'New' | 'Assigned' | 'Replied';
const initialRows: readonly { id: string; task: string; owner: string; status: RequestStatus }[] = [
  { id: 'A', task: 'Website enquiry', owner: 'Front desk', status: 'New' },
  { id: 'B', task: 'Quotation', owner: 'Sales', status: 'Assigned' },
  { id: 'C', task: 'Service visit', owner: 'Technician', status: 'Replied' },
];
function RequestsDemo() {
  const [rows, setRows] = useState(() => initialRows.map(x => ({ ...x })));
  const advance = (id: string) =>
    setRows(prev =>
      prev.map(x => {
        if (x.id !== id) return x;
        if (x.status === 'Replied') return x;
        return { ...x, status: x.status === 'New' ? 'Assigned' : 'Replied' };
      })
    );
  return <div className={styles.demoArea}>
    <div className={styles.exampleTitle}><small>REQUEST WORKSPACE · EXAMPLE DATA</small><h3>Who has the next step?</h3><p>Give each request an owner and a status. Try moving a request forward.</p></div>
    <div className={styles.tableWrap}><table className={styles.requestTable}><thead><tr><th scope="col">Request</th><th scope="col">Responsible role</th><th scope="col">Status</th><th scope="col">Action</th></tr></thead><tbody>{rows.map(row => <tr key={row.id}><th scope="row">{row.task}</th><td>{row.owner}</td><td><span className={styles.statusChip}>{row.status}</span></td><td><button type="button" className={styles.smallAction} onClick={() => advance(row.id)} disabled={row.status === 'Replied'} aria-label={row.status === 'Replied' ? `${row.task} is Replied (terminal)` : `Advance ${row.task} from ${row.status}`}>{row.status === 'Replied' ? 'Done' : 'Next'} <span aria-hidden="true">{row.status === 'Replied' ? <Check size={16} strokeWidth={2} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} /> : <ArrowRight size={16} strokeWidth={1.9} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />}</span></button></td></tr>)}</tbody></table></div>
    <div className={styles.demoControls}><button type="button" className={styles.textButton} onClick={() => setRows(initialRows.map(x => ({ ...x })))}>Reset example</button><span aria-live="polite" role="status">{rows.filter(x => x.status === 'Replied').length} of 3 marked Replied</span></div>
    <p className={styles.demoFoot}>Illustrative browser-only interaction. No shared accounts, notification or database.</p>
  </div>;
}

function QuoteDemo() {
  const [item, setItem] = useState('Site visit');
  const [qty, setQty] = useState('2');
  const [rate, setRate] = useState('1200');
  const [review, setReview] = useState(false);
  const q = Math.max(0, Math.min(100, Number(qty) || 0));
  const r = Math.max(0, Math.min(1000000, Number(rate) || 0));
  const total = q * r;
  return <div className={styles.demoArea}>
    <div className={styles.exampleTitle}><small>QUOTE PREVIEW · SAMPLE INPUTS</small><h3>One item. One reviewable total.</h3><p>Change the values and see how a simple quotation preview could work.</p></div>
    <div className={styles.formGrid}>
      <label>Work description<input value={item} maxLength={80} onChange={e => {setItem(e.target.value);setReview(false);}} /></label>
      <label>Quantity<input type="number" inputMode="numeric" min="0" max="100" value={qty} onChange={e => {setQty(e.target.value);setReview(false);}} /></label>
      <label>Sample rate (₹)<input type="number" inputMode="decimal" min="0" max="1000000" value={rate} onChange={e => {setRate(e.target.value);setReview(false);}} /></label>
    </div>
    <div className={styles.quoteTotal}><span>Illustrative subtotal</span><strong aria-live="polite">{INR.format(total)}</strong></div>
    <button className={styles.actionButton} type="button" onClick={() => setReview(true)}>Review example quote <ArrowUpRight size={16} strokeWidth={1.9} aria-hidden="true" /></button>
    {review && <div className={styles.feedback} role="status" aria-live="polite"><small>NOT A CUSTOMER QUOTE</small><h3>{item.trim() || 'Untitled service'}</h3><p>{q} × {INR.format(r)} = {INR.format(total)}. A real business would approve rates, taxes, terms and delivery before issuing anything.</p></div>}
    <p className={styles.demoFoot}>Sample figures only, not YCN prices. Taxes, discounts and contractual terms are excluded. Nothing is saved or sent.</p>
  </div>;
}

export function WorkDemo({ scene }: { scene: WorkScene }) {
  return <section className={styles.demoWrapper} aria-label="Interactive example">
    <div className={styles.demoTop}><b>TRY THE IDEA</b><span>Interactive concept · no external actions</span></div>
    {scene === 'internal' ? <InternalDemo /> : scene === 'website' ? <ServiceWebsiteDemo /> : scene === 'requests' ? <RequestsDemo /> : <QuoteDemo />}
  </section>;
}
