/**
 * usePageTracking.js — Custom React Hook for SPA page view tracking
 *
 * React Router doesn't reload the page on route changes (it's a SPA),
 * so Google Analytics won't detect navigation automatically.
 *
 * This hook listens to React Router's location changes and sends
 * a page_view event to GA4 every time the user navigates.
 *
 * Usage: Call this hook once inside a component that is INSIDE <Router>.
 * In this project, it's used in App.jsx via the <RouteTracker /> component.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

const usePageTracking = () => {
  // useLocation gives us the current route info (pathname, search, hash)
  const location = useLocation();

  useEffect(() => {
    // Build the full page path including any query parameters
    // e.g. "/blog/top-10-tools?ref=home"
    const fullPath = location.pathname + location.search;

    // Send the page_view event to GA4
    trackPageView(fullPath);

    // Re-run this effect whenever the URL location changes
  }, [location]);
};

export default usePageTracking;
