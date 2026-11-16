import { ArrowRight } from 'lucide-react';
import type { WorkScene } from '@/lib/ycn-work-studies';
import styles from './work.module.css';

/** Original DOM diagrams: no external brand assets, invented customer results or photos. */
export function WorkVisual({ scene }: { scene: WorkScene }) {
  if (scene === 'internal') {
    return <div className={`${styles.visual} ${styles.visualInternal}`} aria-label="Diagram showing an enquiry accepted, saved and notification attempted">
      <div className={styles.diagramHeader}><span>YCN / Enquiry path</span><span>INTERNAL · IN DEVELOPMENT</span></div>
      <div className={styles.diagramChain}><span>Enquiry</span><ArrowRight size={16} strokeWidth={1.9} aria-hidden="true" /><span>Check</span><ArrowRight size={16} strokeWidth={1.9} aria-hidden="true" /><span>Save</span><ArrowRight size={16} strokeWidth={1.9} aria-hidden="true" /><span>Notify</span></div>
      <div className={styles.diagramNote}>The receipt depends on storage, not the notification.</div>
    </div>;
  }
  if (scene === 'website') {
    return <div className={`${styles.visual} ${styles.visualWebsite}`} aria-label="Sample service business website layout with clear service details and contact action">
      <div className={styles.miniNav}><b>LOCAL SERVICE / CONCEPT</b><span>Services · Hours · Contact</span></div>
      <div className={styles.miniSplit}><div><small>HOME & WORKSPACE REPAIRS</small><strong>Help, without the runaround.</strong><p>See the services. Choose a visit. Know what happens next.</p><span className={styles.miniButton}>Request a visit</span></div><div className={styles.miniPanel}><b>What we help with</b><span>Small repairs</span><span>Installation visits</span><span>Maintenance checks</span></div></div>
    </div>;
  }
  if (scene === 'requests') {
    return <div className={`${styles.visual} ${styles.visualRequests}`} aria-label="Illustrative request board with requests and plain status labels">
      <div className={styles.diagramHeader}><span>REQUESTS / DEMO</span><span>Owner · Status · Next step</span></div>
      <div className={styles.requestRows}><div><span>Service enquiry</span><b>New</b></div><div><span>Quotation follow-up</span><b>Assigned</b></div><div><span>Visit scheduling</span><b>Replied</b></div></div>
    </div>;
  }
  return <div className={`${styles.visual} ${styles.visualQuotes}`} aria-label="Sample quote draft with editable quantity and a preview total">
    <div className={styles.diagramHeader}><span>QUOTE / WORKING CONCEPT</span><span>REVIEW BEFORE SENDING</span></div>
    <div className={styles.quoteSheet}><div><span>Service</span><strong>Site visit</strong></div><div><span>Quantity</span><strong>2</strong></div><div><span>Rate</span><strong>₹1,200</strong></div><div><span>Example subtotal</span><strong>₹2,400</strong></div></div>
  </div>;
}
