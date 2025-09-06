import { useState, useEffect } from 'react';
import { getShopInfo } from '../services/shopify';
import type { Shop } from '../types/shopify';

export interface UseShopifyReturn {
  shopInfo: Shop | null;
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
  refetch: () => Promise<void>;
}

export const useShopify = (): UseShopifyReturn => {
  const [shopInfo, setShopInfo] = useState<Shop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShopInfo = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check if environment variables are configured
      if (!import.meta.env.VITE_SHOPIFY_DOMAIN || !import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
        throw new Error('Shopify configuration missing. Please check your environment variables.');
      }

      const data = await getShopInfo();
      setShopInfo(data.shop);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to Shopify';
      setError(errorMessage);
      console.error('Shopify connection error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShopInfo();
  }, []);

  return {
    shopInfo,
    isLoading,
    error,
    isConnected: !!shopInfo && !error,
    refetch: fetchShopInfo,
  };
};