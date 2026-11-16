import { describe, expect, it } from 'vitest';
import { getWorkStudy, workStudies } from '@/lib/ycn-work-studies';

describe('YCN Work case-study publishing rules', () => {
  it('has exactly one internal build and three clearly labelled independent concepts', () => {
    expect(workStudies).toHaveLength(4);
    expect(workStudies.filter(s => s.status === 'INTERNAL BUILD · IN DEVELOPMENT')).toHaveLength(1);
    expect(workStudies.filter(s => s.status === 'INDEPENDENT CONCEPT · DEMONSTRATION')).toHaveLength(3);
  });

  it('uses unique stable slugs and complete useful sections', () => {
    const slugs = workStudies.map(s => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const study of workStudies) {
      expect(study.slug).toMatch(/^[a-z0-9-]+$/);
      expect(getWorkStudy(study.slug)?.heading).toBe(study.heading);
      expect(study.decisions).toHaveLength(3);
      for (const part of [study.heading, study.lead, study.problem, study.designQuestion, study.experience, study.boundary, study.nextValidation]) {
        expect(part.length).toBeGreaterThan(20);
      }
    }
  });

  it('does not pretend concept work is commissioned or use confidentiality as a fictional excuse', () => {
    for (const s of workStudies) {
      expect(s.disclaimer).toMatch(/(concept|development)/i);
      expect(`${s.lead} ${s.disclaimer}`).not.toMatch(/(NDA|confidential client|permission to show|guaranteed ROI|100% secure|trusted by \d+)/i);
    }
  });
});
