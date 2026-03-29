/**
 * © 2026 Amol Mishra (CodeCraftAmol). All rights reserved.
 * Website: https://examtools.in
 * Unauthorized copying or reuse of this file is strictly prohibited.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Copyright notice — visible in browser DevTools console
console.log(
  '%c© 2026 ExamTools.in — Amol Mishra (CodeCraftAmol)\n%cAll rights reserved. https://examtools.in',
  'color:#60a5fa; font-weight:bold; font-size:13px;',
  'color:#94a3b8; font-size:11px;'
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
