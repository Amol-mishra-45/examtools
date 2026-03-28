/**
 * analytics.js — Advanced Google Analytics (GA4) Utility
 *
 * Features:
 *  ✅ Production-only tracking (disabled in localhost/dev environment)
 *  ✅ Graceful error handling if gtag is undefined or fails
 *  ✅ Page view tracking (for React SPA / React Router)
 *  ✅ Tool click tracking
 *  ✅ Blog open tracking
 *  ✅ Button click tracking (download, generate, submit)
 *  ✅ Most-used tool tracking (stored in localStorage)
 *
 * GA4 Measurement ID: G-M9KFW0TMKN
 * The gtag() global function is injected via index.html.
 */

// ─── PRODUCTION GUARD ─────────────────────────────────────────────────────────
// import.meta.env.PROD is true on Vercel / Netlify builds (npm run build).
// It is false during local development (npm run dev / localhost).
// This ensures we never pollute analytics data with test/dev traffic.
const IS_PRODUCTION = import.meta.env.PROD;

// ─── SAFE GTAG WRAPPER ────────────────────────────────────────────────────────
/**
 * Safely calls window.gtag() with full error handling.
 * - Won't crash if GA script fails to load (e.g., ad-blockers, slow networks).
 * - Only fires in production builds.
 *
 * @param {...any} args - Arguments passed directly to gtag()
 */
const safeGtag = (...args) => {
  // 1. Skip tracking entirely in development mode
  if (!IS_PRODUCTION) {
    // Uncomment the line below to debug analytics calls locally:
    // console.log('[Analytics DEV]', ...args);
    return;
  }

  try {
    // 2. Check window exists (SSR safety) and gtag is a function
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag(...args);
    } else {
      // gtag not available yet (e.g., blocked by ad-blocker or not loaded)
      console.warn('[Analytics] window.gtag is not available. Skipping event:', args[1]);
    }
  } catch (error) {
    // 3. Catch any unexpected errors so analytics never breaks the app
    console.error('[Analytics] Error sending event:', error);
  }
};


// ─── 1. PAGE VIEW TRACKING ────────────────────────────────────────────────────
/**
 * Sends a page_view event to GA4.
 * Called on every React Router route change via usePageTracking hook.
 *
 * @param {string} path - The current URL path, e.g. "/tools/cgpa-calculator"
 */
export const trackPageView = (path) => {
  safeGtag('event', 'page_view', {
    page_path: path,
    // page_title and page_location are auto-captured by GA4
  });
};


// ─── 2. TOOL CLICK TRACKING + MOST-USED COUNTER ───────────────────────────────
/**
 * Fires a "tool_click" event when a user opens/uses a tool.
 * Also increments a local usage counter in localStorage so you can
 * display "Most Used Tools" inside the app (without needing backend).
 *
 * @param {string} toolName - Human-readable name, e.g. "CGPA Calculator"
 * @param {string} [toolId]  - Optional tool ID, e.g. "cgpa-to-percentage"
 */
export const trackToolClick = (toolName, toolId = '') => {
  // Send to GA4
  safeGtag('event', 'tool_click', {
    tool_name: toolName,
    tool_id: toolId,
  });

  // Track locally for "Most Used Tools" feature
  // Stored as JSON in localStorage: { "cgpa-to-percentage": 5, ... }
  try {
    const key = 'examtools_usage';
    const stored = JSON.parse(localStorage.getItem(key) || '{}');
    const trackKey = toolId || toolName;
    stored[trackKey] = (stored[trackKey] || 0) + 1;
    localStorage.setItem(key, JSON.stringify(stored));
  } catch {
    // localStorage might be unavailable in private browsing — that's OK
  }
};

/**
 * Retrieves the most-used tools from localStorage, sorted by usage count.
 * Useful for displaying a "Popular Tools" section dynamically.
 *
 * @param {number} [limit=5] - How many top tools to return
 * @returns {Array<{ id: string, count: number }>}
 *
 * Example usage:
 *   const popular = getMostUsedTools(3);
 *   // [{ id: 'cgpa-to-percentage', count: 12 }, { id: 'resize-image-50kb', count: 7 }, ...]
 */
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


// ─── 3. BLOG OPEN TRACKING ────────────────────────────────────────────────────
/**
 * Fires a "blog_open" event when a user opens a blog post.
 *
 * @param {string} blogTitle - The title of the blog post, e.g. "How to Resize Passport Photo"
 * @param {string} [blogId]  - Optional blog slug/ID, e.g. "passport-photo-resize"
 */
export const trackBlogOpen = (blogTitle, blogId = '') => {
  safeGtag('event', 'blog_open', {
    blog_title: blogTitle,
    blog_id: blogId,
  });
};


// ─── 4. BUTTON CLICK TRACKING ─────────────────────────────────────────────────
/**
 * Generic button click tracker. Use this for important interaction buttons.
 *
 * @param {string} buttonType  - Type of button: 'download' | 'generate' | 'submit' | 'convert' | etc.
 * @param {string} [context]   - Where the click happened, e.g. "ResizeImage Tool" or "Blog CTA"
 *
 * Example usages:
 *   trackButtonClick('download', 'ResizeImage Tool');
 *   trackButtonClick('generate', 'TextToPdf Tool');
 *   trackButtonClick('submit',   'CGPA Calculator');
 */
export const trackButtonClick = (buttonType, context = '') => {
  safeGtag('event', 'button_click', {
    button_type: buttonType,   // 'download', 'generate', 'submit', etc.
    button_context: context,   // which tool or page triggered this
  });
};

/**
 * Shorthand: Track a "Download" button click.
 * @param {string} context - e.g. "ResizeImage Tool"
 */
export const trackDownload = (context) => trackButtonClick('download', context);

/**
 * Shorthand: Track a "Generate / Convert" button click.
 * @param {string} context - e.g. "TextToPdf Tool"
 */
export const trackGenerate = (context) => trackButtonClick('generate', context);

/**
 * Shorthand: Track a "Submit / Calculate" button click.
 * @param {string} context - e.g. "CGPA Calculator"
 */
export const trackSubmit = (context) => trackButtonClick('submit', context);
