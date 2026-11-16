import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const read = (p: string) => fs.readFileSync(path.join(process.cwd(), p), 'utf8');

describe('YCN R2 icon system (review candidate)', () => {
  const r2 = read('components/r2/HomepageR2.tsx');
  const work = read('app/work/page.tsx');
  const demo = read('components/work/WorkDemo.tsx');
  const visual = read('components/work/WorkVisual.tsx');
  const css = read('app/ycn-r2.css');

  it('uses one installed SVG family for three genuine services', () => {
    expect(r2).toContain('from "lucide-react"');
    expect(r2).toMatch(/<Globe size=\{24\}/);
    expect(r2).toMatch(/<LayoutDashboard size=\{24\}/);
    expect(r2).toMatch(/<Workflow size=\{24\}/);
    expect(r2).not.toMatch(/<span className="ycnr-offer-icon" aria-hidden="true">\s*[↗▦⇢]/);
  });

  it('removes the inconsistent phone emoji and action glyphs from active demos', () => {
    expect(r2).toContain('<Smartphone size={18}');
    expect(r2).not.toContain('📱 Illustrative Team Alert Concept');
    expect(demo).toContain('<ArrowUpRight size={16}');
    expect(visual).toContain('<ArrowRight size={16}');
    expect(work).toContain('<ArrowDownRight size={16}');
  });

  it('keeps meaningful accessible text and reduced-motion support', () => {
    expect(r2).toContain('CONCEPT · NOT CLIENT WORK');
    expect(r2).toContain('Example only. Nothing is actually sent.');
    expect(r2).toContain('aria-hidden="true"');
    expect(css).toContain('prefers-reduced-motion: reduce');
  });
});
