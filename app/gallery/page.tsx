import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/components/growth/growth.module.css';
import { verifiedGallery } from '@/lib/ycn-growth-content';

const media = verifiedGallery();
export const metadata: Metadata = {
  title: 'Watch & Learn',
  description: 'Original short video explainers, workflow walkthroughs and YCN Labs studio lessons, with full videos on verified social channels.',
  robots: { index: media.length > 0, follow: true },
};

export default function GalleryPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>YCN Labs · Watch & learn</p>
        <h1 className={styles.h1}>See the idea. Understand how it works.</h1>
        <p className={styles.lede}>Short visual explanations for business owners: what a useful website looks like, how teams can organize requests, and where simple automation makes sense.</p>
        {media.length ? (
          <div className={styles.grid}>
            {media.map(item => (
              <a className={styles.card} key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${item.title} — watch full video on ${item.platform === 'youtube' ? 'YouTube' : 'Instagram'} (opens new tab)`}>
                {/* Thumbnail is an Owner-approved local or configured CDN asset; no remote tracking or autoplay on this page. */}
                <Image src={item.thumbnail} alt={`${item.title} — video thumbnail`} width={960} height={540} sizes="(max-width: 850px) 90vw, 45vw" className={styles.thumbnail} />
                <small>{item.category} · {item.platform === 'youtube' ? 'YouTube' : 'Instagram'}{item.duration ? ` · ${item.duration}` : ''}</small>
                <h2 className={styles.h3}>{item.title}</h2>
                <p>{item.summary}</p>
                <span className={styles.cardArrow}>Watch the full video ↗</span>
              </a>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h2 className={styles.h2}>Our video lessons will appear here when ready.</h2>
            <p>We will publish only original, approved videos. Each will have a useful written summary here and a link to its complete version on our verified YouTube or Instagram account.</p>
            <Link className={styles.button} href="/blog">Read practical guides ↗</Link>
          </div>
        )}
        <section className={styles.section} aria-labelledby="gallery-focus">
          <h2 className={styles.h2} id="gallery-focus">What we'll cover</h2>
          <div className={styles.resourceGrid}>
            <div className={styles.resource}><h3>Website breakdowns</h3><p>Why one page is clear and another leaves customers guessing.</p></div>
            <div className={styles.resource}><h3>Software in action</h3><p>Small product walkthroughs that make day-to-day work easier to understand.</p></div>
            <div className={styles.resource}><h3>Inside YCN</h3><p>Authentic notes on projects, design decisions and lessons from building.</p></div>
          </div>
        </section>
        <p className={`${styles.small} ${styles.section}`}>Videos are not autoplayed or embedded by default. Full playback happens on the external platform after you choose to open it.</p>
      </div>
    </div>
  );
}
