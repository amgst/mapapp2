import React from 'react';
import Sidebar from '../components/Sidebar';
import MapPanel from '../components/MapPanel';

export default function Home() {
  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left Sidebar - 30% width on desktop, full width on mobile */}
      <div className="w-full md:w-[30%] bg-white shadow-lg">
        <Sidebar />
      </div>
      
      {/* Right Map Panel - 70% width on desktop, full width on mobile */}
      <div className="w-full md:w-[70%] relative flex-1">
        <MapPanel />
      </div>
    </div>
  );
}