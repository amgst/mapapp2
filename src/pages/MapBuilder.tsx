import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Settings, Layers, ShoppingCart } from 'lucide-react';
import ProductSelector from '../components/ProductSelector';
import ProductDisplay from '../components/ProductDisplay';
import Sidebar from '../components/Sidebar';

interface BuilderState {
  selectedProduct: string;
  selectedSize: string;
  aspectRatio: string;
  mapBounds: any;
  customizations: any[];
}

interface ShopifyConfig {
  theme?: string;
  defaultProduct?: string;
  checkoutEnabled?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
}

const MapBuilder: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [builderState, setBuilderState] = useState<BuilderState>({
    selectedProduct: productId || searchParams.get('product') || '',
    selectedSize: '',
    aspectRatio: '2.62:1',
    mapBounds: null,
    customizations: []
  });
  const [selectedTool, setSelectedTool] = useState('select');
  const [isSaving, setIsSaving] = useState(false);
  const [showProductSelector, setShowProductSelector] = useState(!productId && !searchParams.get('product'));
  const [shopifyConfig, setShopifyConfig] = useState<ShopifyConfig>({});
  const [isShopifyEmbedded, setIsShopifyEmbedded] = useState(false);

  useEffect(() => {
    // Check if running in Shopify iframe
    const isEmbedded = window.parent !== window || searchParams.get('embedded') === 'true';
    setIsShopifyEmbedded(isEmbedded);

    // Parse Shopify configuration from URL parameters
    const config: ShopifyConfig = {
      theme: searchParams.get('theme') || 'light',
      defaultProduct: searchParams.get('defaultProduct') || '',
      checkoutEnabled: searchParams.get('checkoutEnabled') === 'true',
      primaryColor: searchParams.get('primaryColor') || '#000000',
      secondaryColor: searchParams.get('secondaryColor') || '#666666'
    };
    setShopifyConfig(config);

    // Set initial product
    const initialProduct = productId || searchParams.get('product') || config.defaultProduct;
    if (initialProduct) {
      setBuilderState(prev => ({ ...prev, selectedProduct: initialProduct }));
      setShowProductSelector(false);
    }

    // Listen for messages from Shopify parent frame
    if (isEmbedded) {
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === 'shopify:resize') {
          // Handle resize requests from Shopify
          window.parent.postMessage({
            type: 'app:resize',
            height: document.body.scrollHeight
          }, '*');
        }
      };
      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [productId, searchParams]);

  const handleProductChange = (product: string, size: string, aspectRatio: string) => {
    setBuilderState(prev => ({
      ...prev,
      selectedProduct: product,
      selectedSize: size,
      aspectRatio
    }));
    setShowProductSelector(false);
  };

  const handleSizeChange = (size: string) => {
    setBuilderState(prev => ({ ...prev, selectedSize: size }));
  };

  const handleAspectRatioChange = (aspectRatio: string) => {
    setBuilderState(prev => ({ ...prev, aspectRatio }));
  };

  const handleMapBoundsChange = (bounds: any) => {
    setBuilderState(prev => ({ ...prev, mapBounds: bounds }));
  };

  const handleCustomizationsChange = (customizations: any[]) => {
    setBuilderState(prev => ({ ...prev, customizations }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    
    if (isShopifyEmbedded && shopifyConfig.checkoutEnabled) {
      // Send add to cart message to Shopify parent
      window.parent.postMessage({
        type: 'app:addToCart',
        product: {
          id: builderState.selectedProduct,
          customization: {
            mapBounds: builderState.mapBounds,
            customizations: builderState.customizations,
            size: builderState.selectedSize
          }
        }
      }, '*');
    } else {
      // Navigate to preview with session ID
      navigate(`/preview/session-${Date.now()}`);
    }
  };

  const handlePreview = () => {
    navigate(`/preview/session-${Date.now()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isShopifyEmbedded && (
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </button>
            )}
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-xl font-semibold text-black">Map Builder</h1>
            {builderState.selectedProduct && (
              <span className="text-sm text-gray-500 capitalize">
                {builderState.selectedProduct} - {builderState.selectedSize}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowProductSelector(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Change Product
            </button>
            <button
              onClick={handlePreview}
              disabled={!builderState.selectedProduct}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !builderState.selectedProduct}
              className="flex items-center gap-2 px-6 py-2 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              style={{
                backgroundColor: shopifyConfig.primaryColor || '#000000',
                color: 'white'
              }}
            >
              {isShopifyEmbedded && shopifyConfig.checkoutEnabled ? (
                <ShoppingCart className="w-4 h-4" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? 'Processing...' : 
               isShopifyEmbedded && shopifyConfig.checkoutEnabled ? 'Add to Cart' : 'Save & Continue'}
            </button>
          </div>
        </div>
      </header>

      {/* Product Selector Modal */}
      {showProductSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-black">Select Product</h2>
                <button
                  onClick={() => setShowProductSelector(false)}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  ×
                </button>
              </div>
              <ProductSelector
                selectedProduct={builderState.selectedProduct}
                selectedSize={builderState.selectedSize}
                selectedAspectRatio={builderState.aspectRatio}
                onProductChange={handleProductChange}
                onSizeChange={handleSizeChange}
                onAspectRatioChange={handleAspectRatioChange}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar - 30% */}
        <div className="w-[30%] bg-white border-r border-gray-200">
          <Sidebar />
        </div>

        {/* Right Panel - 70% */}
        <div className="flex-1">
          {builderState.selectedProduct ? (
            <ProductDisplay
              aspectRatio={builderState.aspectRatio}
              customizations={builderState.customizations}
            />
          ) : (
            <div className="h-full bg-white flex items-center justify-center">
              <div className="text-center">
                <Layers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">Select a Product</h3>
                <p className="text-gray-400 mb-4">Choose a product to start building your custom map</p>
                <button
                  onClick={() => setShowProductSelector(true)}
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Choose Product
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapBuilder;