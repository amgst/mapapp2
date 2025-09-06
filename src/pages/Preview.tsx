import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Download, ShoppingCart } from 'lucide-react';

interface PreviewState {
  sessionData: any;
  selectedMaterial: string;
  selectedOverlay: string;
  isLoading: boolean;
}

const Preview: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  
  const [previewState, setPreviewState] = useState<PreviewState>({
    sessionData: null,
    selectedMaterial: 'wood',
    selectedOverlay: 'none',
    isLoading: true
  });

  const materials = [
    { id: 'wood', name: 'Wood', color: '#8B4513' },
    { id: 'metal', name: 'Metal', color: '#C0C0C0' },
    { id: 'acrylic', name: 'Acrylic', color: '#F5F5F5' }
  ];

  const overlayColors = [
    { id: 'none', name: 'None', color: 'transparent' },
    { id: 'red', name: 'Red', color: '#DC2626' },
    { id: 'blue', name: 'Blue', color: '#2563EB' },
    { id: 'green', name: 'Green', color: '#16A34A' },
    { id: 'purple', name: 'Purple', color: '#9333EA' },
    { id: 'orange', name: 'Orange', color: '#EA580C' },
    { id: 'pink', name: 'Pink', color: '#EC4899' }
  ];

  useEffect(() => {
    // Simulate loading session data
    setTimeout(() => {
      setPreviewState(prev => ({
        ...prev,
        sessionData: { id: sessionId, productType: 'cutting-board-rect' },
        isLoading: false
      }));
    }, 1000);
  }, [sessionId]);

  const handleAddToCart = () => {
    // TODO: Implement Shopify cart integration
    console.log('Adding to cart with session:', sessionId);
  };

  const handleBackToBuilder = () => {
    navigate('/builder');
  };

  if (previewState.isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your design...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToBuilder}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Builder
          </button>
          <h1 className="text-xl font-semibold text-black">Design Preview</h1>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-600 hover:text-black transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main 3D Preview Area */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-lg h-full flex items-center justify-center">
            {/* 3D Viewer Placeholder */}
            <div className="text-center">
              <div className="w-96 h-64 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-amber-300">
                <div className="text-center">
                  <RotateCcw className="w-12 h-12 text-amber-600 mx-auto mb-2" />
                  <p className="text-amber-700 font-medium">3D Preview</p>
                  <p className="text-amber-600 text-sm">Interactive 3D model will render here</p>
                </div>
              </div>
              <p className="text-gray-600">Drag to rotate • Scroll to zoom</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Controls */}
        <div className="w-80 bg-white border-l border-gray-200 p-6">
          <div className="space-y-6">
            {/* Material Selection */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-3">Material</h3>
              <div className="grid grid-cols-1 gap-2">
                {materials.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => setPreviewState(prev => ({ ...prev, selectedMaterial: material.id }))}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      previewState.selectedMaterial === material.id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: material.color }}
                    ></div>
                    <span className="font-medium">{material.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Overlay Colors */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-3">Overlay Color</h3>
              <div className="grid grid-cols-3 gap-2">
                {overlayColors.map((overlay) => (
                  <button
                    key={overlay.id}
                    onClick={() => setPreviewState(prev => ({ ...prev, selectedOverlay: overlay.id }))}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      previewState.selectedOverlay === overlay.id
                        ? 'border-black'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    title={overlay.name}
                  >
                    <div
                      className="w-full h-8 rounded border border-gray-300"
                      style={{ backgroundColor: overlay.color }}
                    ></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Final Preview */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-3">Engraving Preview</h3>
              <div className="bg-amber-100 rounded-lg p-4 border border-amber-200">
                <div className="w-full h-32 bg-gradient-to-br from-amber-200 to-amber-300 rounded border-2 border-dashed border-amber-400 flex items-center justify-center">
                  <p className="text-amber-700 text-sm font-medium">Final engraving appearance</p>
                </div>
                <p className="text-amber-700 text-xs mt-2">Black areas will be engraved into the material</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;