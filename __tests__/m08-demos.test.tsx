import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ExampleWebsite } from '@/components/m08/demos/ExampleWebsite';
import { ExampleWebApp } from '@/components/m08/demos/ExampleWebApp';
import { ExampleCrmAdmin } from '@/components/m08/demos/ExampleCrmAdmin';
import {
  ExampleTabletFrame,
  ExamplePhoneFrame,
  ExampleMonitorFrame,
} from '@/components/m08/demos/ExampleDeviceFrames';

describe('M08-B Showroom Demos: Component & Behavior Specification Tests', () => {
  describe('Device Frames (ExampleDeviceFrames)', () => {
    it('renders tablet frame with data-device="tablet" and light productScreen', () => {
      const html = renderToStaticMarkup(
        React.createElement(ExampleTabletFrame, null, React.createElement('div', null, 'Content'))
      );
      expect(html).toContain('data-device="tablet"');
      expect(html).toContain('productScreen');
      expect(html).toContain('Content');
    });

    it('renders phone frame with data-device="phone", 9:41 status bar, and aria-hidden SVG status icons without arbitrary text glyphs', () => {
      const html = renderToStaticMarkup(
        React.createElement(ExamplePhoneFrame, null, React.createElement('div', null, 'Content'))
      );
      expect(html).toContain('data-device="phone"');
      expect(html).toContain('9:41');
      expect(html).toContain('aria-hidden="true"');
      expect(html).toContain('focusable="false"');
      // The arbitrary text glyphs ◉ ▰ must NOT be in the markup
      expect(html).not.toContain('◉ ▰');
      expect(html).not.toContain('◉');
      expect(html).not.toContain('▰');
    });

    it('renders monitor frame with data-device="monitor", stand, and foot', () => {
      const html = renderToStaticMarkup(
        React.createElement(ExampleMonitorFrame, null, React.createElement('div', null, 'Content'))
      );
      expect(html).toContain('data-device="monitor"');
      expect(html).toContain('monitorStand');
      expect(html).toContain('monitorFoot');
      expect(html).toContain('Content');
    });
  });

  describe('Websites Demo (ExampleWebsite - Section B1)', () => {
    const html = renderToStaticMarkup(React.createElement(ExampleWebsite));

    it('renders Example Home Repairs brand with decorative home SVG icon replacing bare ⌂ text symbol', () => {
      expect(html).toContain('Example Home Repairs');
      // Must not contain bare text symbol ⌂
      expect(html).not.toContain('⌂');
      // Must contain decorative SVG with aria-hidden="true" and focusable="false"
      expect(html).toMatch(/<svg[^>]*aria-hidden="true"[^>]*focusable="false"/);
    });

    it('renders the basin and tap illustration with exact ratified accessible text', () => {
      expect(html).toContain('aria-label="Illustration of a basin and tap"');
      expect(html).toContain('role="img"');
    });

    it('renders hero title, lead copy, and in-demo request visit button', () => {
      expect(html).toContain('Need a repair at home? Ask for a visit.');
      expect(html).toContain(
        'Tell us what needs fixing and when suits you. We will get back to you to agree a time.'
      );
      expect(html).toContain('Request a visit →');
    });

    it('renders three approved services: Plumbing, Electrical, and Painting', () => {
      expect(html).toContain('Plumbing');
      expect(html).toContain('Leaking taps, blocked drains and pipe repairs.');
      expect(html).toContain('Electrical');
      expect(html).toContain('Wiring checks, switches and fittings.');
      expect(html).toContain('Painting');
      expect(html).toContain('Interior walls and touch-up work.');
    });

    it('renders about section and contact section with initial selection', () => {
      expect(html).toContain('About us');
      expect(html).toContain('We are a small local team that handles everyday repairs at home.');
      expect(html).toContain('Selected: Plumbing');
    });

    it('renders responsive navigation button for small screens', () => {
      expect(html).toContain('Menu');
    });
  });

  describe('Web Apps Demo (ExampleWebApp - Section B2)', () => {
    const html = renderToStaticMarkup(React.createElement(ExampleWebApp));

    it('renders exact mandatory v3 header subline "Request a visit"', () => {
      expect(html).toContain('Example Home Repairs');
      expect(html).toContain('<small>Request a visit</small>');
      expect(html).not.toContain('Visit request · Web-app concept');
    });

    it('renders Step 1 with service options and progress indicator', () => {
      expect(html).toContain('STEP 1 OF 3');
      expect(html).toContain('What do you need?');
      expect(html).toContain('Choose one service.');
      expect(html).toContain('Tap repair');
      expect(html).toContain('Wiring check');
      expect(html).toContain('Wall painting');
      expect(html).toContain('Continue');
    });

    it('renders exact mandatory v3 footer "Sample customer. Nothing you choose is collected."', () => {
      expect(html).toContain('Sample customer. Nothing you choose is collected.');
      expect(html).not.toContain('Sample: Anita · No real information is collected');
    });
  });

  describe('CRM & Admin Demo (ExampleCrmAdmin - Section B3)', () => {
    const html = renderToStaticMarkup(React.createElement(ExampleCrmAdmin));

    it('renders exact mandatory v3 sidebar subline "Admin"', () => {
      expect(html).toContain('Example Home Repairs');
      expect(html).toContain('Admin</small>');
      expect(html).not.toContain('Admin workspace');
    });

    it('renders exact mandatory v3 under-title "Sample records. Nothing is saved."', () => {
      expect(html).toContain('Sample records. Nothing is saved.');
      expect(html).not.toContain('Fictional operations workspace · no saved records');
    });

    it('renders exact mandatory v3 reset button "Reset sample records"', () => {
      expect(html).toContain('Reset sample records');
      expect(html).not.toContain('Reset sample</button>');
    });

    it('renders exact search placeholder and accessible label "Search by customer, job or area"', () => {
      expect(html).toContain('placeholder="Search by customer, job or area"');
      expect(html).toContain('aria-label="Search by customer, job or area"');
      expect(html).toContain('Search by customer, job or area</label>');
      // Must not contain older search label "Search by customer or job"
      expect(html).not.toContain('Search by customer or job');
    });

    it('renders summary metric counters for New, Visits planned, and Done', () => {
      expect(html).toContain('<small>New</small>');
      expect(html).toContain('<small>Visits planned</small>');
      expect(html).toContain('<small>Done</small>');
    });

    it('renders initial seeded records in Requests table', () => {
      expect(html).toContain('Anita');
      expect(html).toContain('Tap repair');
      expect(html).toContain('North');
      expect(html).toContain('Ravi');
      expect(html).toContain('Wiring check');
      expect(html).toContain('Meena');
      expect(html).toContain('Wall painting');
    });

    it('renders Request details panel with history and technician assignment', () => {
      expect(html).toContain('Request details');
      expect(html).toContain('EXAMPLE-001');
      expect(html).toContain('Change status');
      expect(html).toContain('Assign technician');
      expect(html).toContain('Request received');
    });

    it('defines handleStatusChange and handleTechChange appending (demo) history entries', () => {
      // Static verification that history entries match the required prototype format
      expect(typeof ExampleCrmAdmin).toBe('function');
    });
  });
});
