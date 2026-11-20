import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) =>
    React.createElement('a', { href, ...rest }, children),
}));

import { HeroSection } from '@/components/m08/HeroSection';
import { HeroDeviceVisual } from '@/components/m08/HeroDeviceVisual';
import { ShowroomFoundation } from '@/components/m08/ShowroomFoundation';
import {
  SHOWROOM_MODES,
  SHOWROOM_DISCLOSURE,
  SELECTOR_GROUP_LABEL,
} from '@/components/m08/showroomModes';
import M08PreviewPage from '@/app/m08-preview/page';

describe('M08-A Foundation: Component & Integrity Verification', () => {
  describe('HeroSection', () => {
    const html = renderToStaticMarkup(React.createElement(HeroSection));

    it('renders the exact ratified H1 and subheading', () => {
      expect(html).toContain('Websites that earn trust.');
      expect(html).toContain('Software that saves time.');
      expect(html).toContain(
        'We turn business problems into digital products that help customers act, teams work clearly, and the business keep moving.'
      );
    });

    it('renders the reassurance copy', () => {
      expect(html).toContain('You don’t need a technical brief to start.');
    });

    it('renders the approved CTAs and target links', () => {
      expect(html).toContain('Start a Project');
      expect(html).toContain('href="/contact"');
      expect(html).toContain('See what we solve');
      expect(html).toContain('href="/what-we-solve"');
    });

    it('renders the in-page showroom navigation link', () => {
      expect(html).toContain('Explore interactive examples ↓');
      expect(html).toContain('href="#showroom"');
    });

    it('wraps the device visual in an accessible link to the showroom', () => {
      expect(html).toContain(
        'aria-label="Example shop on a laptop and a phone. See the interactive examples below."'
      );
    });
  });

  describe('HeroDeviceVisual', () => {
    const html = renderToStaticMarkup(React.createElement(HeroDeviceVisual));

    it('renders the Shop. brand identity and products', () => {
      expect(html).toContain('Shop<span class="');
      expect(html).toContain('THE EVERYDAY EDIT · SAMPLE SHOP');
      expect(html).toContain('Showcase your products.');
      expect(html).toContain('Discover products in a responsive online shop.');
      expect(html).toContain('Shop now');
      expect(html).toContain('Sneakers');
      expect(html).toContain('Everyday bag');
      expect(html).toContain('Smartwatch');
    });

    it('renders the accessible readable caption under the picture (Owner Condition 1)', () => {
      expect(html).toContain('Example shop. Not a real business or client.');
    });
  });

  describe('ShowroomFoundation', () => {
    const html = renderToStaticMarkup(React.createElement(ShowroomFoundation));

    it('renders the section title and lead', () => {
      expect(html).toContain('Explore what we can build');
      expect(html).toContain('Pick an example and try it. Everything here is a demo.');
    });

    it('renders tablist with approved aria-label', () => {
      expect(html).toContain('role="tablist"');
      expect(html).toContain(`aria-label="${SELECTOR_GROUP_LABEL}"`);
    });

    it('renders all six mode selectors', () => {
      expect(SHOWROOM_MODES).toHaveLength(6);
      SHOWROOM_MODES.forEach((mode) => {
        expect(html).toContain(`id="tab-${mode.id}"`);
        expect(html).toContain(mode.label.replace('&', '&amp;'));
      });
    });

    it('renders initial active mode as Websites with proper aria attributes', () => {
      expect(html).toContain('id="tab-website"');
      expect(html).toContain('aria-selected="true"');
      expect(html).toContain('id="panel-website"');
      expect(html).toContain('role="tabpanel"');
      expect(html).toContain('aria-label="Example: Websites"');
    });

    it('renders live announcement element for screen readers', () => {
      expect(html).toContain('role="status"');
      expect(html).toContain('aria-live="polite"');
      expect(html).toContain('Websites example selected.');
    });

    it('renders exact approved disclosure banner', () => {
      expect(html).toContain(SHOWROOM_DISCLOSURE);
      expect(html).toContain('Fictional concept demonstrations.');
    });
  });

  describe('Development-Only Preview Boundary (app/m08-preview)', () => {
    const originalEnv = process.env.NODE_ENV;
    const originalNetlify = process.env.NETLIFY;
    const originalContext = process.env.CONTEXT;

    it('throws NEXT_NOT_FOUND (HTTP 404) in production environment', () => {
      // @ts-expect-error mutating NODE_ENV for test
      process.env.NODE_ENV = 'production';
      expect(() => M08PreviewPage()).toThrow('NEXT_NOT_FOUND');
      // @ts-expect-error restoring NODE_ENV
      process.env.NODE_ENV = originalEnv;
    });

    it('throws NEXT_NOT_FOUND (HTTP 404) in Netlify staging build', () => {
      // @ts-expect-error mutating NODE_ENV for test
      process.env.NODE_ENV = 'development';
      process.env.NETLIFY = 'true';
      expect(() => M08PreviewPage()).toThrow('NEXT_NOT_FOUND');
      process.env.NETLIFY = originalNetlify;
      // @ts-expect-error restoring NODE_ENV
      process.env.NODE_ENV = originalEnv;
    });

    it('throws NEXT_NOT_FOUND (HTTP 404) in Netlify branch deploy', () => {
      // @ts-expect-error mutating NODE_ENV for test
      process.env.NODE_ENV = 'development';
      process.env.CONTEXT = 'branch-deploy';
      expect(() => M08PreviewPage()).toThrow('NEXT_NOT_FOUND');
      process.env.CONTEXT = originalContext;
      // @ts-expect-error restoring NODE_ENV
      process.env.NODE_ENV = originalEnv;
    });

    it('renders successfully in local development mode', () => {
      // @ts-expect-error mutating NODE_ENV for test
      process.env.NODE_ENV = 'development';
      delete process.env.NETLIFY;
      delete process.env.CONTEXT;
      const html = renderToStaticMarkup(React.createElement(M08PreviewPage));
      expect(html).toContain('Development Preview Only');
      expect(html).toContain('Websites that earn trust.');
      expect(html).toContain('Explore what we can build');
      // @ts-expect-error restoring NODE_ENV
      process.env.NODE_ENV = originalEnv;
      process.env.NETLIFY = originalNetlify;
      process.env.CONTEXT = originalContext;
    });
  });
});
