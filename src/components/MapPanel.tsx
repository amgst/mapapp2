import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Layers, Navigation, MapPin } from 'lucide-react';

interface MapLocation {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  isSelected?: boolean;
}

const mapLocations: MapLocation[] = [
  {
    id: '1',
    name: 'PARIS',
    country: 'FRANCE',
    lat: 48.8566,
    lng: 2.3522,
    isSelected: true
  },
  {
    id: '2',
    name: 'STOCKHOLM',
    country: 'SWEDEN',
    lat: 59.3293,
    lng: 18.0686
  },
  {
    id: '3',
    name: 'BERLIN',
    country: 'GERMANY',
    lat: 52.5200,
    lng: 13.4050
  }
];

export default function MapPanel() {
  const [selectedLocation, setSelectedLocation] = useState<string>('1');
  const [showLayers, setShowLayers] = useState(false);

  return (
    <div className="h-full relative bg-gray-800 overflow-hidden">
      {/* Map Background - Simulated with CSS pattern */}
      <div className="absolute inset-0 bg-gray-700">
        {/* Street pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="streets" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="#4a5568" />
                <rect x="0" y="45" width="100" height="10" fill="#2d3748" />
                <rect x="45" y="0" width="10" height="100" fill="#2d3748" />
                <rect x="20" y="20" width="60" height="5" fill="#2d3748" />
                <rect x="20" y="75" width="60" height="5" fill="#2d3748" />
                <rect x="20" y="20" width="5" height="60" fill="#2d3748" />
                <rect x="75" y="20" width="5" height="60" fill="#2d3748" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#streets)" />
          </svg>
        </div>
        
        {/* Additional street details */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-0.5 bg-gray-500 transform rotate-45"></div>
          <div className="absolute top-3/4 left-1/3 w-1/3 h-0.5 bg-gray-500 transform -rotate-12"></div>
          <div className="absolute top-1/2 right-1/4 w-1/4 h-0.5 bg-gray-500 transform rotate-12"></div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
        {/* Zoom Controls */}
        <div className="bg-white rounded-lg shadow-lg">
          <button className="p-3 hover:bg-gray-50 border-b border-gray-200">
            <ZoomIn className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-3 hover:bg-gray-50">
            <ZoomOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Layer Control */}
        <button 
          onClick={() => setShowLayers(!showLayers)}
          className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50"
        >
          <Layers className="w-5 h-5 text-gray-600" />
        </button>
        
        {/* Navigation Control */}
        <button className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50">
          <Navigation className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Location Markers */}
      {mapLocations.map((location, index) => (
        <div
          key={location.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20`}
          style={{
            left: `${30 + index * 20}%`,
            top: `${40 + index * 15}%`
          }}
          onClick={() => setSelectedLocation(location.id)}
        >
          {/* Marker Pin */}
          <div className={`relative`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
              location.id === selectedLocation 
                ? 'bg-blue-500 ring-4 ring-blue-200' 
                : 'bg-red-500 hover:bg-red-600'
            }`}>
              <MapPin className="w-4 h-4 text-white" />
            </div>
            
            {/* Location Info Card */}
            {location.id === selectedLocation && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 min-w-[200px] z-30">
                <div className="text-center">
                  <h3 className="font-bold text-lg text-gray-900">{location.name}</h3>
                  <p className="text-sm text-gray-600 uppercase tracking-wide">{location.country}</p>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500">Click to explore</p>
                  </div>
                </div>
                {/* Arrow pointing down */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Layer Panel */}
      {showLayers && (
        <div className="absolute top-4 right-20 bg-white rounded-lg shadow-xl p-4 z-30 min-w-[200px]">
          <h3 className="font-semibold text-gray-900 mb-3">Map Layers</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-gray-700">Streets</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-gray-700">Satellite</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-gray-700">Labels</span>
            </label>
          </div>
        </div>
      )}

      {/* Map Attribution */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded text-xs text-gray-600">
        © MapApp Store Locator
      </div>
    </div>
  );
}