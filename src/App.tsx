import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import Home from './pages/Home';
import MapBuilder from './pages/MapBuilder';
import Preview from './pages/Preview';
import AdminDashboard from './pages/AdminDashboard';
// import AdminOrderDetails from './pages/AdminOrderDetails';

const AppContent: React.FC = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Apply Shopify theme configuration
    const theme = searchParams.get('theme') || 'light';
    const primaryColor = searchParams.get('primaryColor');
    const secondaryColor = searchParams.get('secondaryColor');

    // Apply theme class to body
    document.body.className = theme === 'dark' ? 'dark' : '';

    // Apply custom CSS variables for Shopify colors
    if (primaryColor) {
      document.documentElement.style.setProperty('--shopify-primary', primaryColor);
    }
    if (secondaryColor) {
      document.documentElement.style.setProperty('--shopify-secondary', secondaryColor);
    }

    // Notify parent frame that app is ready
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'app:ready',
        height: document.body.scrollHeight
      }, '*');
    }
  }, [searchParams]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/builder" element={<MapBuilder />} />
      <Route path="/builder/:productId" element={<MapBuilder />} />
      <Route path="/preview/:sessionId" element={<Preview />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      {/* <Route path="/admin/orders/:orderId" element={<AdminOrderDetails />} /> */}
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
