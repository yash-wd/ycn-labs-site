import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ExampleWebsite } from '@/components/m08/demos/ExampleWebsite';
import { ExampleWebApp } from '@/components/m08/demos/ExampleWebApp';
import { ExampleCrmAdmin } from '@/components/m08/demos/ExampleCrmAdmin';
import { ExampleAutomation } from '@/components/m08/demos/ExampleAutomation';
import { ExampleStore, STORE_PRODUCTS, STORE_CATEGORIES } from '@/components/m08/demos/ExampleStore';
import { ExampleLearning, LEARNING_LESSONS, QUIZ_OPTIONS } from '@/components/m08/demos/ExampleLearning';
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
  });

  describe('ExampleAutomation (Automation Demonstration)', () => {
    const html = renderToStaticMarkup(React.createElement(ExampleAutomation));

    it('renders workflow container with id="demo-automation" in laptop shell with light productScreen', () => {
      expect(html).toContain('id="demo-automation"');
      expect(html).toContain('data-device="laptop"');
      expect(html).toContain('productScreen');
    });

    it('renders header "Example Home Repairs · Workflows", subline, and "Simulated" chip', () => {
      expect(html).toContain('Example Home Repairs · Workflows');
      expect(html).toContain('Request handling · Sample execution');
      expect(html).toContain('Simulated');
    });

    it('renders initial status "Ready. Press Run example." in status element', () => {
      expect(html).toContain('id="auto-status"');
      expect(html).toContain('Ready. Press Run example.');
    });

    it('renders accessible control buttons: Run example, Pause, Start again', () => {
      expect(html).toContain('data-action="auto-run"');
      expect(html).toContain('Run example');
      expect(html).toContain('data-action="auto-pause"');
      expect(html).toContain('Pause');
      expect(html).toContain('data-action="auto-reset"');
      expect(html).toContain('Start again');
    });

    it('renders all 6 sequential workflow step nodes with initial titles and Waiting status', () => {
      expect(html).toContain('A customer sends a request');
      expect(html).toContain('The request is saved');
      expect(html).toContain('The owner gets an alert');
      expect(html).toContain('The owner confirms the visit');
      expect(html).toContain('The technician marks the job done');
      expect(html).toContain('The customer gets an update');
      expect(html).toContain('data-index="0"');
      expect(html).toContain('data-index="5"');
    });

    it('renders detail inspection card with initial step 1 information', () => {
      expect(html).toContain('id="auto-detail"');
      expect(html).toContain('Starts it');
      expect(html).toContain('Anita requests a tap repair, with Saturday morning preferred.');
    });

    it('renders Execution history section with initial empty state "No steps have run."', () => {
      expect(html).toContain('Execution history');
      expect(html).toContain('No steps have run.');
    });

    it('renders human action bar with initial idle prompt and failure simulation toggle', () => {
      expect(html).toContain('Person steps need your click.');
      expect(html).toContain('data-action="auto-fail"');
      expect(html).toContain('Show what happens when a step fails');
    });

    it('renders companion phone shell with 9:41 lock clock and notification stream switch', () => {
      expect(html).toContain('9:41');
      expect(html).toContain('Sample · Now');
      expect(html).toContain('data-action="auto-phone"');
      expect(html).toContain('data-phone="owner"');
      expect(html).toContain('data-phone="customer');
      expect(html).toContain('Notifications appear here as the sample workflow runs.');
    });

    it('renders mobile notification fallback with proper accessible attributes', () => {
      expect(html).toContain('aria-label="Mobile notification preview"');
      expect(html).toContain('Phone notification preview · 9:41');
      expect(html).toContain('An alert will appear here after its step runs.');
    });

    it('strictly avoids arbitrary text glyphs in status icons and hardware shells', () => {
      expect(html).not.toContain('◉ ▰');
      expect(html).not.toContain('◉');
      expect(html).not.toContain('▰');
    });
  });

  describe('Online Store Demo (ExampleStore - Section B & M08-D)', () => {
    const html = renderToStaticMarkup(React.createElement(ExampleStore));

    it('renders Example Home Supplies brand with accessible SVG house icon replacing bare ⌂ text symbol', () => {
      expect(html).toContain('Example Home Supplies');
      expect(html).not.toContain('⌂');
      expect(html).toMatch(/<svg[^>]*aria-hidden="true"/);
    });

    it('renders hero banner with kicker, heading, and tool kit artwork', () => {
      expect(html).toContain('HOME ESSENTIALS · EXAMPLE STORE');
      expect(html).toContain('Small things. Better home.');
      expect(html).toContain('Browse useful supplies and tools. All items and prices are fictional.');
    });

    it('renders all four shop category filters', () => {
      expect(html).toContain('aria-label="Shop category"');
      for (const cat of STORE_CATEGORIES) {
        expect(html).toContain(`data-filter="${cat}"`);
      }
    });

    it('renders all 6 catalog products with names, categories, and sample INR prices', () => {
      for (const p of STORE_PRODUCTS) {
        expect(html).toContain(p.name);
        expect(html).toContain(`data-id="${p.id}"`);
      }
      expect(html).toContain('₹450');
      expect(html).toContain('₹60');
      expect(html).toContain('₹240');
      expect(html).toContain('₹390');
      expect(html).toContain('₹950');
      expect(html).toContain('₹210');
    });

    it('renders cart button with initial zero count', () => {
      expect(html).toContain('data-action="store-cart"');
      expect(html).toContain('Cart (0)');
    });

    it('renders fictional store footnote disclosure', () => {
      expect(html).toContain('Sample products and prices. This is a fictional online store.');
    });
  });

  describe('Learning Platform Demo (ExampleLearning - Section C & M08-D)', () => {
    const html = renderToStaticMarkup(React.createElement(ExampleLearning));

    it('renders Example Learning Hub brand and student workspace subhead', () => {
      expect(html).toContain('Example Learning Hub');
      expect(html).toContain('Student workspace');
      expect(html).toContain('Sample student · Fictional learning centre');
    });

    it('renders navigation views for desktop and mobile', () => {
      expect(html).toContain('data-view="My courses"');
      expect(html).toContain('data-view="Progress"');
      expect(html).toContain('aria-label="Learning platform views"');
    });

    it('renders course overview card with kicker, heading, and book icon', () => {
      expect(html).toContain('COURSE · COMPUTER BASICS');
      expect(html).toContain('Learn everyday computer skills.');
      expect(html).toContain('Three short sample lessons and a practice question.');
    });

    it('renders initial progress tracking bar at 0 of 3 lessons complete', () => {
      expect(html).toContain('0 of 3 lessons complete');
      expect(html).toContain('role="progressbar"');
      expect(html).toContain('aria-label="Lesson progress 0 of 3"');
    });

    it('renders all 3 lessons in lesson list', () => {
      for (let i = 0; i < LEARNING_LESSONS.length; i++) {
        expect(html).toContain(LEARNING_LESSONS[i].title);
        expect(html).toContain(`data-index="${i}"`);
      }
    });

    it('renders initial lesson 1 reader content with tip callout and toggle button', () => {
      expect(html).toContain('LESSON 1 OF 3');
      expect(html).toContain(LEARNING_LESSONS[0].title);
      expect(html).toContain(LEARNING_LESSONS[0].body);
      expect(html).toContain(LEARNING_LESSONS[0].tip);
      expect(html).toContain('data-action="learn-complete"');
      expect(html).toContain('Mark lesson as complete');
    });

    it('renders short quiz with question and 3 radio choices', () => {
      expect(html).toContain('Short quiz');
      expect(html).toContain('Which key adds a space between words?');
      expect(html).toContain('role="radiogroup"');
      for (const opt of QUIZ_OPTIONS) {
        expect(html).toContain(`value="${opt}"`);
      }
      expect(html).toContain('data-action="learn-quiz-check"');
      expect(html).toContain('Check answer');
    });

    it('renders Start again reset control', () => {
      expect(html).toContain('data-action="learn-reset"');
      expect(html).toContain('Start again');
    });
  });
});
