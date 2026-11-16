import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/components/growth/growth.module.css';
import { verifiedUpdates } from '@/lib/ycn-growth-content';

const news = verifiedUpdates();
export const metadata: Metadata = {
  title: 'Studio Updates',
  description: 'Verified YCN Labs milestones, practical behind-the-scenes notes, event announcements and published mentions.',
  robots: { index: news.length > 0, follow: true },
};

export default function UpdatesPage() {
  return <div className={styles.page}><div className={styles.container}>
    <p className={styles.eyebrow}>YCN Labs · Studio updates</p>
    <h1 className={styles.h1}>The work, as it happens.</h1>
    <p className={styles.lede}>A place for real milestones, what we have learned, community events and genuinely useful announcements. We only publish claims we can support.</p>
    {news.length ? <div className={styles.grid}>{news.map(item => <article key={item.id} className={styles.card}>
      <small>{item.kind} · {item.date}</small><h2 className={styles.h3}>{item.title}</h2><p>{item.summary}</p>
      {item.proofUrl && <a className={styles.textLink} href={item.proofUrl} target="_blank" rel="noopener noreferrer">View source ↗</a>}
    </article>)}</div> : <div className={styles.empty}><h2 className={styles.h2}>No announcements are published yet.</h2><p>When we have a real product milestone, a verified event, an original project note or external coverage, it will appear here with a source. We won't fill this page with imaginary achievements.</p><Link href="/work" className={styles.button}>Explore our demonstrations ↗</Link></div>}
  </div></div>;
}
