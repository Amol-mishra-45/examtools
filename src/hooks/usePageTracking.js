/**
 * © 2026 Amol Mishra (CodeCraftAmol). All rights reserved.
 * usePageTracking — fires a GA4 page_view on every React Router navigation.
 * Must be used inside a component that is a child of <Router>.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Send page_view including any query string (e.g. /blog?ref=home)
    trackPageView(location.pathname + location.search);
  }, [location]);
};

export default usePageTracking;
