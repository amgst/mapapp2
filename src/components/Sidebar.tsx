import React, { useState } from 'react';
import { Search, MapPin, Star, Edit3 } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
  rating: number;
  distance: string;
}

const popularPlaces: Location[] = [
  {
    id: '1',
    name: 'Paris, France',
    address: 'City of Light',
    rating: 4.8,
    distance: '2.5 km'
  },
  {
    id: '2',
    name: 'Stockholm, Sweden',
    address: 'Nordic Capital',
    rating: 4.7,
    distance: '1.2 km'
  },
  {
    id: '3',
    name: 'Berlin, Germany',
    address: 'Historic City',
    rating: 4.6,
    distance: '3.1 km'
  },
  {
    id: '4',
    name: 'Tokyo, Japan',
    address: 'Modern Metropolis',
    rating: 4.9,
    distance: '0.8 km'
  },
  {
    id: '5',
    name: 'London, UK',
    address: 'Royal City',
    rating: 4.5,
    distance: '1.9 km'
  }
];

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const filteredPlaces = popularPlaces.filter(place =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Search Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <Search className="w-4 h-4 text-gray-600" />
          <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
            SEARCH FOR A PLACE
          </h2>
        </div>
        
        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search for a location, event or landmark"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-300 focus:border-transparent text-sm placeholder-gray-500 hover:bg-white transition-colors"
          />
        </div>
        
        {/* Current Location Option */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="currentLocation"
            checked={useCurrentLocation}
            onChange={(e) => setUseCurrentLocation(e.target.checked)}
            className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
          />
          <label htmlFor="currentLocation" className="text-sm text-gray-600 font-medium">
            Or use your current position
          </label>
        </div>
      </div>

      {/* Popular Places Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-4 h-4 text-gray-600" />
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
              OTHER POPULAR PLACES
            </h3>
          </div>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            These are some of the most popular places among customers and staff, and worth checking out if you want some inspiration.
          </p>
          
          {/* Location List */}
          <div className="space-y-2">
            {filteredPlaces.map((place) => (
              <div
                key={place.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md cursor-pointer transition-all duration-200 group border border-transparent hover:border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <MapPin className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700">{place.name}</h4>
                    <p className="text-xs text-gray-500">{place.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600 font-medium">{place.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">{place.distance}</span>
                  <Edit3 className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="p-6 border-t border-gray-100 bg-white">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-gray-900">€€€ 44,99 €</span>
        </div>
        <button className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 px-6 rounded-md transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md">
          <span className="text-sm uppercase tracking-wide">ADD TO CART</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}