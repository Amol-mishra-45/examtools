/**
 * © 2026 Amol Mishra (CodeCraftAmol). All rights reserved.
 * analytics.js — GA4 Utility for ExamTools.in
 *
 * Features:
 *  ✅ Production-only (disabled on localhost)
 *  ✅ Page view, tool click, blog open tracking
 *  ✅ LocalStorage usage counter for "most-used" tools
 *  ✅ Graceful error handling (ad-blockers, network issues)
 */

// Only fires in production builds (import.meta.env.PROD = false in dev)
const IS_PRODUCTION = import.meta.env.PROD;

/** Safely call window.gtag() — won't crash if GA is blocked */
const safeGtag = (...args) => {
  if (!IS_PRODUCTION) return;
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag(...args);
    }
  } catch {
    // Silently fail — analytics should never break the app
  }
};

/** Track a React Router page navigation as a GA4 page_view */
export const trackPageView = (path) => {
  safeGtag('event', 'page_view', { page_path: path });
};

/**
 * Track when a user opens a tool.
 * Also increments a local counter in localStorage for "most used" features.
 */
export const trackToolClick = (toolName, toolId = '') => {
  safeGtag('event', 'tool_click', { tool_name: toolName, tool_id: toolId });

  try {
    const key = 'examtools_usage';
    const stored = JSON.parse(localStorage.getItem(key) || '{}');
    const trackKey = toolId || toolName;
    stored[trackKey] = (stored[trackKey] || 0) + 1;
    localStorage.setItem(key, JSON.stringify(stored));
  } catch {
    // localStorage unavailable in private browsing — that's OK
  }
};

/** Get the top N tools by local usage count */
export const getMostUsedTools = (limit = 5) => {
  try {
    const stored = JSON.parse(localStorage.getItem('examtools_usage') || '{}');
    return Object.entries(stored)
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  } catch {
    return [];
  }
};

/** Track when a user opens a blog post */
export const trackBlogOpen = (blogTitle, blogId = '') => {
  safeGtag('event', 'blog_open', { blog_title: blogTitle, blog_id: blogId });
};

/** Generic button interaction tracker */
export const trackButtonClick = (buttonType, context = '') => {
  safeGtag('event', 'button_click', { button_type: buttonType, button_context: context });
};

// Shorthand helpers — use in tool components for consistent tracking
export const trackDownload = (context) => trackButtonClick('download', context);
export const trackGenerate = (context) => trackButtonClick('generate', context);
export const trackSubmit  = (context) => trackButtonClick('submit', context);
