/**
 * © 2026 Amol Mishra (CodeCraftAmol). All rights reserved.
 * Website: https://examtools.in
 * Unauthorized copying or reuse of this file is strictly prohibited.
 */
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Static Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ✅ GA4: Page view tracker hook (tracks every React Router navigation)
import usePageTracking from './hooks/usePageTracking';

/**
 * RouteTracker must be rendered INSIDE <Router> so it can use useLocation.
 * It fires a GA4 page_view event on every route change.
 */
const RouteTracker = () => {
  usePageTracking();
  return null; // Renders nothing — it only runs the tracking side-effect
};

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const ToolsPage = lazy(() => import('./pages/ToolsPage'));
const ToolDetail = lazy(() => import('./pages/ToolDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const About = lazy(() => import('./pages/About'));
const Terms = lazy(() => import('./pages/Terms'));

// Loading Fallback
const PageLoader = () => (
  <div className="flex-grow flex items-center justify-center py-32 h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        {/* ✅ GA4: RouteTracker must be inside Router to access useLocation */}
        <RouteTracker />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          <div className="flex-grow flex flex-col">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/tools/:id" element={<ToolDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<Terms />} />
                
                {/* Fallback route */}
                <Route
                  path="*"
                  element={
                    <div className="text-center py-24 px-6 flex-grow flex flex-col items-center justify-center">
                      <div className="text-7xl mb-6">404</div>
                      <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Page Not Found</h2>
                      <p className="text-slate-500 mt-3 text-lg font-medium">We couldn't locate this page on our server.</p>
                      <a href="/" className="mt-8 bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                        Return Home
                      </a>
                    </div>
                  }
                />
              </Routes>
            </Suspense>
          </div>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
