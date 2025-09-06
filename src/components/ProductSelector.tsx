import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ProductSelectorProps {
  selectedProduct: string;
  selectedSize: string;
  selectedAspectRatio: string;
  onProductChange: (product: string, size: string, aspectRatio: string) => void;
  onSizeChange: (size: string) => void;
  onAspectRatioChange: (aspectRatio: string) => void;
}

interface ProductType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  sizes: {
    id: string;
    name: string;
    dimensions: string;
    aspectRatio: string;
    price: number;
  }[];
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  selectedProduct,
  selectedSize,
  selectedAspectRatio,
  onProductChange,
  onSizeChange,
  onAspectRatioChange
}) => {
  const products: ProductType[] = [
    {
      id: 'cutting-board-rect',
      name: 'Cutting Board - Rectangle',
      description: 'Premium hardwood cutting board with custom map engraving',
      basePrice: 79.99,
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20rectangular%20wooden%20cutting%20board%20on%20white%20background%2C%20clean%20product%20photography%2C%20natural%20wood%20grain%2C%20professional%20lighting&image_size=square',
      sizes: [
        { id: 'small', name: 'Small', dimensions: '12" × 8"', aspectRatio: '2.62:1', price: 79.99 },
        { id: 'medium', name: 'Medium', dimensions: '16" × 10"', aspectRatio: '2.62:1', price: 99.99 },
        { id: 'large', name: 'Large', dimensions: '20" × 12"', aspectRatio: '2.62:1', price: 129.99 }
      ]
    },
    {
      id: 'cutting-board-round',
      name: 'Cutting Board - Round',
      description: 'Elegant round cutting board perfect for serving and display',
      basePrice: 69.99,
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20round%20wooden%20cutting%20board%20on%20white%20background%2C%20clean%20product%20photography%2C%20natural%20wood%20grain%2C%20circular%20shape&image_size=square',
      sizes: [
        { id: 'small', name: 'Small', dimensions: '10" diameter', aspectRatio: '1.38:1', price: 69.99 },
        { id: 'medium', name: 'Medium', dimensions: '12" diameter', aspectRatio: '1.38:1', price: 89.99 },
        { id: 'large', name: 'Large', dimensions: '14" diameter', aspectRatio: '1.38:1', price: 109.99 }
      ]
    },
    {
      id: 'ornament-circle',
      name: 'Ornament - Circle',
      description: 'Beautiful wooden ornament with custom map design',
      basePrice: 24.99,
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20circular%20wooden%20ornament%20with%20hanging%20string%20on%20white%20background%2C%20clean%20product%20photography%2C%20natural%20wood%20finish&image_size=square',
      sizes: [
        { id: 'small', name: 'Small', dimensions: '3" diameter', aspectRatio: '1.38:1', price: 24.99 },
        { id: 'medium', name: 'Medium', dimensions: '4" diameter', aspectRatio: '1.38:1', price: 34.99 }
      ]
    },
    {
      id: 'ornament-rect',
      name: 'Ornament - Rectangle',
      description: 'Classic rectangular ornament with personalized engraving',
      basePrice: 29.99,
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20rectangular%20wooden%20ornament%20with%20hanging%20string%20on%20white%20background%2C%20clean%20product%20photography%2C%20natural%20wood%20finish&image_size=square',
      sizes: [
        { id: 'small', name: 'Small', dimensions: '4" × 3"', aspectRatio: '2.62:1', price: 29.99 },
        { id: 'medium', name: 'Medium', dimensions: '5" × 4"', aspectRatio: '2.62:1', price: 39.99 }
      ]
    },
    {
      id: 'candle-square',
      name: 'Candle - Square',
      description: 'Premium soy candle with custom map label design',
      basePrice: 49.99,
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20square%20white%20candle%20in%20glass%20jar%20on%20white%20background%2C%20clean%20product%20photography%2C%20elegant%20design&image_size=square',
      sizes: [
        { id: 'small', name: 'Small', dimensions: '3" × 3"', aspectRatio: '3.10:1', price: 49.99 },
        { id: 'medium', name: 'Medium', dimensions: '4" × 4"', aspectRatio: '3.10:1', price: 64.99 },
        { id: 'large', name: 'Large', dimensions: '5" × 5"', aspectRatio: '3.10:1', price: 79.99 }
      ]
    },
    {
      id: 'candle-round',
      name: 'Candle - Round',
      description: 'Elegant round candle with custom map design',
      basePrice: 44.99,
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20round%20white%20candle%20in%20glass%20jar%20on%20white%20background%2C%20clean%20product%20photography%2C%20circular%20shape&image_size=square',
      sizes: [
        { id: 'small', name: 'Small', dimensions: '3" diameter', aspectRatio: '1.38:1', price: 44.99 },
        { id: 'medium', name: 'Medium', dimensions: '4" diameter', aspectRatio: '1.38:1', price: 59.99 }
      ]
    }
  ];

  const selectedProductData = products.find(p => p.id === selectedProduct);
  const selectedSizeData = selectedProductData?.sizes.find(s => s.id === selectedSize);

  const handleProductSelect = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      // Auto-select first size and update aspect ratio
      const firstSize = product.sizes[0];
      onProductChange(productId, firstSize.id, firstSize.aspectRatio);
      onSizeChange(firstSize.id);
      onAspectRatioChange(firstSize.aspectRatio);
    }
  };

  const handleSizeSelect = (sizeId: string) => {
    const size = selectedProductData?.sizes.find(s => s.id === sizeId);
    if (size) {
      onSizeChange(sizeId);
      onAspectRatioChange(size.aspectRatio);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Product Selection */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Your Product
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductSelect(product.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedProduct === product.id
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="aspect-square mb-2 rounded overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-sm text-black mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{product.description}</p>
                  <p className="text-sm font-semibold text-black">From ${product.basePrice}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          {selectedProductData && (
            <div className="lg:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Size
              </label>
              <div className="relative">
                <select
                  value={selectedSize || ''}
                  onChange={(e) => handleSizeSelect(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="" disabled>Choose size...</option>
                  {selectedProductData.sizes.map((size) => (
                    <option key={size.id} value={size.id}>
                      {size.name} - {size.dimensions} - ${size.price}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              
              {selectedSizeData && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Dimensions:</span>
                    <span className="text-sm text-black">{selectedSizeData.dimensions}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Aspect Ratio:</span>
                    <span className="text-sm text-black">{selectedSizeData.aspectRatio}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Price:</span>
                    <span className="text-lg font-bold text-black">${selectedSizeData.price}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              selectedProduct ? 'bg-black border-black text-white' : 'border-gray-300 text-gray-400'
            }`}>
              <span className="text-sm font-medium">1</span>
            </div>
            <div className={`w-16 h-0.5 ${
              selectedProduct && selectedSize ? 'bg-black' : 'bg-gray-300'
            }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              selectedProduct && selectedSize ? 'bg-black border-black text-white' : 'border-gray-300 text-gray-400'
            }`}>
              <span className="text-sm font-medium">2</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 text-gray-400">
              <span className="text-sm font-medium">3</span>
            </div>
          </div>
          <div className="ml-6 text-sm text-gray-600">
            {!selectedProduct && 'Step 1: Choose your product'}
            {selectedProduct && !selectedSize && 'Step 2: Select size'}
            {selectedProduct && selectedSize && 'Step 3: Customize your map'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSelector;