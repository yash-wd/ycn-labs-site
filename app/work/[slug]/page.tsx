import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getWorkStudy, workStudies } from '@/lib/ycn-work-studies';
import { WorkDemo } from '@/components/work/WorkDemo';
import { WorkVisual } from '@/components/work/WorkVisual';
import styles from '@/components/work/work.module.css';

type Route = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return workStudies.map(study => ({ slug: study.slug })); }

export async function generateMetadata({ params }: Route): Promise<Metadata> {
  const { slug } = await params;
  const study = getWorkStudy(slug);
  if (!study) return { title: 'Work — YCN Labs' };
  return {
    title: `${study.heading} — ${study.category} | YCN Labs`,
    description: `${study.lead} ${study.status === 'INTERNAL BUILD · IN DEVELOPMENT' ? 'Internal work in development.' : 'Original independent concept; not client work.'}`,
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function WorkStudyPage({ params }: Route) {
  const { slug } = await params;
  const study = getWorkStudy(slug);
  if (!study) notFound();
  return <div className={styles.work}>
    <section className={styles.detailHero} aria-labelledby="case-title"><div className={styles.container}>
      <Link className={styles.backLink} href="/work"><span aria-hidden="true">←</span> All work</Link>
      <div className={styles.detailHeroGrid}><div><p className={styles.eyebrow}>{study.kicker}</p><h1 id="case-title">{study.heading}</h1><p className={styles.heroLead}>{study.lead}</p><p className={styles.status}>{study.status}</p></div><WorkVisual scene={study.scene}/></div>
    </div></section>
    <section className={styles.articleSection} aria-labelledby="problem-heading"><div className={`${styles.container} ${styles.articleLayout}`}><div className={styles.articleAside}><p className={styles.eyebrow}>THE SITUATION</p><h2 id="problem-heading">A problem worth solving.</h2></div><div className={styles.articleBody}><p className={styles.articleLead}>{study.problem}</p><dl className={styles.infoList}><div><dt>Who this is for</dt><dd>{study.audience}</dd></div><div><dt>The design question</dt><dd>{study.designQuestion}</dd></div></dl></div></div></section>
    <section className={styles.articleSection} aria-labelledby="decisions-heading"><div className={styles.container}>
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>DECISIONS</p><h2 id="decisions-heading">What matters in the design.</h2></div><p>Useful software starts with choosing what to do—and what to leave out.</p></div>
      <ol className={styles.decisionList}>{study.decisions.map((decision,i) => <li key={decision.title}><span>{String(i+1).padStart(2,'0')}</span><h3>{decision.title}</h3><p>{decision.explanation}</p></li>)}</ol>
    </div></section>
    <section className={styles.interactiveSection} aria-labelledby="try-it-heading"><div className={styles.container}>
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>TRY AN EXAMPLE</p><h2 id="try-it-heading">See the idea in action.</h2></div><p>{study.experience}</p></div>
      <WorkDemo scene={study.scene}/>
    </div></section>
    <section className={styles.articleSection} aria-labelledby="boundaries-heading"><div className={`${styles.container} ${styles.articleLayout}`}><div className={styles.articleAside}><p className={styles.eyebrow}>WHAT'S TRUE TODAY</p><h2 id="boundaries-heading">Clear about the limits.</h2></div><div className={styles.articleBody}><div className={styles.boundaryBox}><h3>{study.resultLabel}</h3><p>{study.resultText}</p></div><h3>What this does not claim</h3><p>{study.boundary}</p><h3>What we would check next</h3><p>{study.nextValidation}</p><p className={styles.disclaimer}>{study.disclaimer}</p></div></div></section>
    <section className={styles.closing}><div className={styles.container}><div className={styles.closingGrid}><div><p className={styles.eyebrow}>YOUR BUSINESS, NOT A TEMPLATE</p><h2>Have a similar problem?</h2><p>Describe the part that takes too long or causes confusion. We can discuss the smallest useful first step.</p></div><Link href="/contact" className={styles.primaryAction}>Start a project <span aria-hidden="true">↗</span></Link></div></div></section>
  </div>;
}
