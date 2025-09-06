import React from 'react';
import ShopifyConnection from '../components/ShopifyConnection';
import { useShopify } from '../hooks/useShopify';

export default function Home() {
  const { shopInfo, isConnected } = useShopify();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Hello World! 👋
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Welcome to your Shopify Storefront App
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              🚀 Version 1.0 - Simple Connection
            </span>
          </div>
        </div>

        {/* Shopify Connection Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Shopify Store Connection
          </h2>
          <ShopifyConnection />
        </div>

        {/* Store Info Display */}
        {isConnected && shopInfo && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              🏪 Store Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Store Name</h3>
                <p className="text-gray-700">{shopInfo.name}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Domain</h3>
                <p className="text-gray-700">{shopInfo.primaryDomain.url}</p>
              </div>
              {shopInfo.description && (
                <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                  <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{shopInfo.description}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Setup Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            🔧 Setup Instructions
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white text-sm font-medium">
                  1
                </span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Configure Environment</h3>
                <p className="text-gray-600">Update the <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file with your Shopify store credentials</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white text-sm font-medium">
                  2
                </span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Get Storefront API Token</h3>
                <p className="text-gray-600">Create a private app in your Shopify admin and get the Storefront API access token</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white text-sm font-medium">
                  3
                </span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Test Connection</h3>
                <p className="text-gray-600">Restart the development server and verify the connection above</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}