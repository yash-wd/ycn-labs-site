import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '@/components/growth/growth.module.css';
import { EDITORIAL_PREVIEW, getVisibleArticle, visibleArticles, estimatedReadMinutes } from '@/lib/ycn-growth-content';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return visibleArticles().map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getVisibleArticle(slug);
  if (!article) return { title: 'Article unavailable', robots: { index: false } };
  return {
    title: article.title, description: article.description,
    alternates: { canonical: `https://ycnlabs.com/blog/${article.slug}` },
    robots: { index: article.status === 'published' && !EDITORIAL_PREVIEW, follow: true },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getVisibleArticle(slug);
  if (!article) notFound();
  return (
    <div className={styles.page}>
      <div className={`${styles.container} ${styles.narrow}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog">Guides</Link><span aria-hidden="true">/</span><span>{article.category}</span></nav>
        {article.status === 'draft' && <p className={styles.notice}>Unpublished editorial draft for Owner fact-check and review. Not ready for public distribution.</p>}
        <p className={styles.eyebrow}>{article.category} · {estimatedReadMinutes(article)} min read</p>
        <h1 className={styles.h1}>{article.title}</h1>
        <p className={styles.lede}>{article.intro}</p>
        <div className={styles.meta}><span>YCN Labs · Editorial draft</span><span>Clear advice, no sales guarantee</span></div>
        <article className={styles.article}>
          {article.body.map((block, i) => {
            if (block.kind === 'paragraph') return <p key={i}>{block.text}</p>;
            if (block.kind === 'heading') return <h2 key={i}>{block.title}</h2>;
            if (block.kind === 'list') return <ul key={i}>{block.items.map((item,j) => <li key={j}>{item}</li>)}</ul>;
            if (block.kind === 'example') return <aside key={i} className={styles.example}><h3>{block.title}</h3><p>{block.text}</p></aside>;
            return <details key={i} className={styles.context}><summary>{block.title}</summary><p>{block.answer}</p></details>;
          })}
          <section className={styles.example} aria-labelledby="takeaway-heading"><h2 id="takeaway-heading" className={styles.h3}>The practical takeaway</h2><p>{article.takeaway}</p></section>
        </article>
        <div className={styles.related}>
          <Link href="/blog" className={styles.textLink}>← More practical guides</Link>
          <Link href="/contact" className={styles.button}>Discuss your situation ↗</Link>
        </div>
      </div>
    </div>
  );
}
