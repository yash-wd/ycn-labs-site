import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/components/growth/growth.module.css';
import { EDITORIAL_PREVIEW, estimatedReadMinutes, visibleArticles } from '@/lib/ycn-growth-content';

export const metadata: Metadata = {
  title: 'Ideas & Guides',
  description: 'Clear, useful guides for Indian business owners deciding what website, workflow or web software they actually need.',
  robots: { index: !EDITORIAL_PREVIEW && visibleArticles().length > 0, follow: true },
};

export default function BlogPage() {
  const posts = visibleArticles();
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>YCN Labs · Practical guides</p>
        <h1 className={styles.h1}>Better decisions before bigger software.</h1>
        <p className={styles.lede}>Plain-language notes for owners who want a clearer website, a smoother way of working, or a better question to ask before paying for technology.</p>
        {EDITORIAL_PREVIEW && <p className={styles.notice}>Editorial review mode. These drafts are not approved or published and must not appear on the production website.</p>}
        {posts.length > 0 ? (
          <div className={styles.grid}>
            {posts.map(post => (
              <Link className={styles.card} href={`/blog/${post.slug}`} key={post.slug}>
                <small>{post.category} · {estimatedReadMinutes(post)} min read</small>
                <h2 className={styles.h3}>{post.title}</h2>
                <p>{post.description}</p>
                <span className={styles.cardArrow}>Read the guide ↗</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.empty}><h2 className={styles.h2}>Guides are being prepared.</h2><p>We publish practical explanations only after the examples and advice have been reviewed. In the meantime, explore the problems we help businesses work through.</p><Link href="/what-we-solve" className={styles.button}>Explore practical solutions ↗</Link></div>
        )}
        <details className={styles.context}>
          <summary>Not sure what topic to start with?</summary>
          <p>If customers cannot understand your offer, begin with the website guides. If your team is losing track of requests, look at business workflows. If you are choosing someone to build software, read the project-planning guides.</p>
          <p>Already have a specific problem? <Link className={styles.textLink} href="/contact">Tell us what is difficult today</Link>.</p>
        </details>
        <section className={styles.section} aria-labelledby="learning-more">
          <h2 id="learning-more" className={styles.h2}>Prefer to watch an explanation?</h2>
          <p className={styles.lede}>Our media gallery will collect short, original lessons and screen walkthroughs. Full videos will link to our verified YouTube or Instagram posts.</p>
          <Link className={styles.textLink} href="/gallery">Visit the learning gallery ↗</Link>
        </section>
      </div>
    </div>
  );
}
