/**
 * analytics.js — Reusable Google Analytics (GA4) utility
 *
 * This file provides helper functions to track:
 *  1. Page views on every route change (for React SPA support)
 *  2. Custom events like tool clicks and blog opens
 *
 * GA4 Measurement ID: G-M9KFW0TMKN
 * The gtag() function is loaded globally via index.html.
 */

// ─── Helper: safely call gtag (prevents errors if GA fails to load) ──────────
const gtag = (...args) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
};

// ─── 1. PAGE VIEW TRACKING ────────────────────────────────────────────────────
/**
 * Sends a page_view event to GA4.
 * Call this every time the React Router location changes.
 *
 * @param {string} path - The current URL path, e.g. "/tools/cgpa-calculator"
 */
export const trackPageView = (path) => {
  gtag('event', 'page_view', {
    page_path: path,
    // page_title is captured automatically by GA4
  });
};

// ─── 2. TOOL CLICK TRACKING ───────────────────────────────────────────────────
/**
 * Fires a "tool_click" event when a user opens/uses a tool.
 *
 * @param {string} toolName - A human-readable name, e.g. "CGPA Calculator"
 */
export const trackToolClick = (toolName) => {
  gtag('event', 'tool_click', {
    tool_name: toolName,
  });
};

// ─── 3. BLOG OPEN TRACKING ────────────────────────────────────────────────────
/**
 * Fires a "blog_open" event when a user opens a blog post.
 *
 * @param {string} blogTitle - The title of the blog post opened
 */
export const trackBlogOpen = (blogTitle) => {
  gtag('event', 'blog_open', {
    blog_title: blogTitle,
  });
};
