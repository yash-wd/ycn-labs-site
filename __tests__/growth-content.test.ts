import { describe, it, expect } from 'vitest';
import { articles, allowedSocialUrl, estimatedReadMinutes, galleryItems, studioUpdates } from '../lib/ycn-growth-content';

describe('YCN editorial safety and correctness', () => {
  it('contains original, separately-addressed article topics with unique stable slugs', () => {
    expect(articles.length).toBeGreaterThanOrEqual(3);
    expect(new Set(articles.map(a => a.slug)).size).toBe(articles.length);
    expect(articles.every(a => /^[a-z0-9-]+$/.test(a.slug))).toBe(true);
  });
  it('does not publish unreviewed drafts by default', () => {
    expect(articles.every(a => a.status === 'draft')).toBe(true);
    expect(articles.every(a => estimatedReadMinutes(a) >= 2)).toBe(true);
  });
  it('accepts only the expected HTTPS social platforms for actual owner videos', () => {
    expect(allowedSocialUrl('https://www.youtube.com/watch?v=abcdefghijk')).toBe(true);
    expect(allowedSocialUrl('https://www.instagram.com/reel/abc123/')).toBe(true);
    expect(allowedSocialUrl('https://youtu.be/abcdefghijk')).toBe(true);
    expect(allowedSocialUrl('https://evil.youtube.com/watch?v=no')).toBe(false);
    expect(allowedSocialUrl('https://youtube.com.evil.test/x')).toBe(false);
    expect(allowedSocialUrl('javascript:alert(1)')).toBe(false);
    expect(allowedSocialUrl('http://youtube.com/watch?v=abc')).toBe(false);
  });
  it('does not invent media or company achievements', () => {
    expect(galleryItems).toHaveLength(0);
    expect(studioUpdates).toHaveLength(0);
  });
});
