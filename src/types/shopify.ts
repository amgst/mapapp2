// Shopify API Type Definitions

export interface Shop {
  name: string;
  description: string;
  primaryDomain: {
    url: string;
  };
}

export interface ProductImage {
  url: string;
  altText: string;
}

export interface ProductPrice {
  amount: string;
  currencyCode: string;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    edges: Array<{
      node: ProductImage;
    }>;
  };
  priceRange: {
    minVariantPrice: ProductPrice;
  };
}

export interface ShopResponse {
  shop: Shop;
}

export interface ProductsResponse {
  products: {
    edges: Array<{
      node: Product;
    }>;
  };
}

export interface StorefrontApiResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
  }>;
}

// Component Props
export interface ShopifyConnectionProps {
  isConnected: boolean;
  shopInfo?: Shop;
  error?: string;
}