// Minimal loader for React Map Builder App
(function() {
  'use strict';
  
  // Configuration from Shopify
  const config = window.SHOPIFY_MAP_CONFIG || {};
  
  // Create container for the React app
  function createMapContainer() {
    const container = document.createElement('div');
    container.id = 'shopify-map-builder-root';
    container.style.width = '100%';
    container.style.minHeight = '600px';
    return container;
  }
  
  // Load external React app
  function loadReactApp() {
    const container = createMapContainer();
    const targetElement = document.querySelector('.map-builder-container');
    
    if (targetElement) {
      targetElement.appendChild(container);
      
      // Apply theme configuration
      if (config.primaryColor) {
        document.documentElement.style.setProperty('--map-primary-color', config.primaryColor);
      }
      if (config.secondaryColor) {
        document.documentElement.style.setProperty('--map-secondary-color', config.secondaryColor);
      }
      
      // Load React and ReactDOM from CDN
      const reactScript = document.createElement('script');
      reactScript.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
      reactScript.onload = function() {
        const reactDOMScript = document.createElement('script');
        reactDOMScript.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
        reactDOMScript.onload = function() {
          // Load the main app bundle
          loadMainApp();
        };
        document.head.appendChild(reactDOMScript);
      };
      document.head.appendChild(reactScript);
    }
  }
  
  // Load main application
  function loadMainApp() {
    // This would load from your deployed app URL
    const appUrl = config.appUrl || window.location.origin;
    
    // Create iframe as fallback for now
    const iframe = document.createElement('iframe');
    iframe.src = `${appUrl}/builder`;
    iframe.style.width = '100%';
    iframe.style.height = '600px';
    iframe.style.border = 'none';
    
    const container = document.getElementById('shopify-map-builder-root');
    if (container) {
      container.appendChild(iframe);
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadReactApp);
  } else {
    loadReactApp();
  }
})();