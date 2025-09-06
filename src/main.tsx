import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Check for Shopify embedded mode
const shopifyRoot = document.getElementById("shopify-map-builder-root");
const standardRoot = document.getElementById("root");
const targetRoot = shopifyRoot || standardRoot;

if (!targetRoot) {
  console.error('No root element found. Looking for #shopify-map-builder-root or #root');
} else {
  // Apply Shopify configuration if available
  if (window.SHOPIFY_MAP_CONFIG) {
    console.log('Shopify configuration detected:', window.SHOPIFY_MAP_CONFIG);
    
    // Apply theme styles
    if (window.SHOPIFY_MAP_CONFIG.theme === 'dark') {
      document.body.classList.add('dark');
    }
    
    // Apply custom colors
    if (window.SHOPIFY_MAP_CONFIG.primaryColor) {
      document.documentElement.style.setProperty('--shopify-primary', window.SHOPIFY_MAP_CONFIG.primaryColor);
    }
    if (window.SHOPIFY_MAP_CONFIG.secondaryColor) {
      document.documentElement.style.setProperty('--shopify-secondary', window.SHOPIFY_MAP_CONFIG.secondaryColor);
    }
  }

  createRoot(targetRoot).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// Global type declarations for Shopify integration
declare global {
  interface Window {
    SHOPIFY_MAP_CONFIG?: {
      theme?: string;
      defaultProduct?: string;
      checkoutEnabled?: boolean;
      primaryColor?: string;
      secondaryColor?: string;
    };
    addToShopifyCart?: (product: any) => void;
  }
}
