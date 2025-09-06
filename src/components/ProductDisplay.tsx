import React, { useState } from 'react';
import { Heart, Star, ShoppingBag } from 'lucide-react';

interface ProductDisplayProps {
  aspectRatio: string;
  customizations: Array<{
    type: 'text' | 'compass' | 'icon';
    content?: string;
    x?: number;
    y?: number;
  }>;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ aspectRatio, customizations }) => {
  const [selectedProduct] = useState<Product>({
    id: '1',
    name: 'Custom Map Poster',
    price: 44.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 1247,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20minimalist%20map%20poster%20with%20clean%20lines%20and%20elegant%20typography%2C%20black%20and%20white%20city%20map%20design%2C%20premium%20wall%20art&image_size=portrait_4_3',
    description: 'Personalized map poster of your favorite location'
  });
  const [isFavorited, setIsFavorited] = useState(false);

  // Calculate product frame dimensions based on aspect ratio
  const getFrameDimensions = () => {
    const [width, height] = aspectRatio.split(':').map(Number);
    const ratio = width / height;
    const maxWidth = 600;
    const maxHeight = 500;
    
    let frameWidth, frameHeight;
    
    if (ratio > maxWidth / maxHeight) {
      frameWidth = maxWidth;
      frameHeight = maxWidth / ratio;
    } else {
      frameHeight = maxHeight;
      frameWidth = maxHeight * ratio;
    }
    
    return { width: frameWidth, height: frameHeight };
  };

  const { width: frameWidth, height: frameHeight } = getFrameDimensions();

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Product Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black">Product Preview</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Frame: {aspectRatio}</span>
            <span className="text-sm text-gray-600">•</span>
            <span className="text-sm text-gray-600">
              {frameWidth} × {frameHeight}px
            </span>
          </div>
        </div>
      </div>

      {/* Product Display Area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="relative">
          {/* Product Frame Container */}
          <div
            className="relative bg-white rounded-lg shadow-lg border-2 border-gray-200 overflow-hidden"
            style={{ width: frameWidth, height: frameHeight }}
          >
            {/* Product Image */}
            <div className="relative w-full h-full">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTIwSDIyNVYxODBIMTc1VjEyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE1MCAyMTBIMjUwVjIzMEgxNTBWMjEwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                }}
              />
              
              {/* Product Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                {/* Favorite Button */}
                <button
                  onClick={handleFavoriteToggle}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Heart 
                    className={`w-5 h-5 transition-colors ${
                      isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`} 
                  />
                </button>
                
                {/* Product Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{selectedProduct.name}</h3>
                  <p className="text-sm text-gray-200 mb-3">{selectedProduct.description}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {renderStars(selectedProduct.rating)}
                    </div>
                    <span className="text-sm text-gray-200">
                      {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold">${selectedProduct.price}</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-lg text-gray-300 line-through">
                        ${selectedProduct.originalPrice}
                      </span>
                    )}
                    {selectedProduct.originalPrice && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                        Save ${(selectedProduct.originalPrice - selectedProduct.price).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Customization Overlays */}
              {customizations.map((customization, index) => (
                <div
                  key={index}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${customization.x || 50}%`,
                    top: `${customization.y || 50}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {customization.type === 'text' && (
                    <div className="bg-white/90 backdrop-blur-sm text-black px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                      {customization.content}
                    </div>
                  )}
                  {customization.type === 'compass' && (
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                    </div>
                  )}
                  {customization.type === 'icon' && (
                    <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                      <ShoppingBag className="w-4 h-4 text-black" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Frame Size Indicator */}
            <div className="absolute top-2 left-2 bg-black/75 text-white px-2 py-1 rounded text-xs font-medium">
              {aspectRatio}
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Info Footer */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            Frame: {frameWidth} × {frameHeight}px
          </div>
          <div>
            Aspect Ratio: {aspectRatio}
          </div>
          <div>
            Customizations: {customizations.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;