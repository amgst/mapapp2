import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// Shopify Storefront API Client
const client = createStorefrontApiClient({
  storeDomain: `https://${import.meta.env.VITE_SHOPIFY_DOMAIN}.myshopify.com`,
  apiVersion: '2024-01',
  publicAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

// GraphQL Queries
export const SHOP_QUERY = `
  query getShop {
    shop {
      name
      description
      primaryDomain {
        url
      }
    }
  }
`;

export const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

// API Functions
export const getShopInfo = async () => {
  try {
    const response = await client.request(SHOP_QUERY);
    return response.data;
  } catch (error) {
    console.error('Error fetching shop info:', error);
    throw error;
  }
};

export const getProducts = async (first: number = 10) => {
  try {
    const response = await client.request(PRODUCTS_QUERY, {
      variables: { first },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export default client;