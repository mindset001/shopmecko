'use client';

import { useState, useEffect } from 'react';
import { Repairer } from '@/types/models';
import { getNearbyRepairers } from '@/lib/mock-repairers';

// This is a placeholder component that simulates a map integration
// In a real application, this would use a mapping library like Google Maps, Mapbox, or Leaflet
export default function LocationMap({
  userLocation = { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
  providers = [],
  onSelectProvider = () => {},
  className = ''
}: {
  userLocation?: { lat: number, lng: number },
  providers?: Repairer[],
  onSelectProvider?: (provider: Repairer) => void,
  className?: string
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [selectedRepairer, setSelectedRepairer] = useState<Repairer | null>(null);
  
  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Function to handle provider selection
  const handleSelectProvider = (provider: Repairer) => {
    setSelectedProviderId(provider.id);
    setSelectedRepairer(provider);
    onSelectProvider(provider);
  };
  
  // Calculate provider distances (this would be handled by the mapping library in a real app)
  const providersWithDistance = providers.map(provider => {
    // Calculate a mock distance
    const lat = provider.location?.coordinates?.latitude || 37.7;
    const lng = provider.location?.coordinates?.longitude || -122.4;
    
    const latDiff = userLocation.lat - lat;
    const lngDiff = userLocation.lng - lng;
    const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 69; // Rough miles conversion
    
    return {
      ...provider,
      distance: parseFloat(distance.toFixed(1))
    };
  });
  
  // Sort by distance
  const sortedProviders = [...providersWithDistance].sort((a, b) => a.distance - b.distance);
  
  return (
    <div className={`relative rounded-lg overflow-hidden shadow-lg ${className}`}>
      {/* Map placeholder - in a real app this would be the actual map */}
      <div 
        className="relative w-full h-full bg-blue-50 min-h-[400px]"
        style={{
          backgroundImage: "url('/map-placeholder.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Loading overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
        
        {/* User location marker */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="relative">
            <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
            <div className="absolute w-24 h-24 -top-12 -left-12 rounded-full bg-blue-500/20 animate-ping-slow"></div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap">
              <div className="bg-white py-1 px-2 rounded shadow-md text-xs font-medium">
                Your Location
              </div>
            </div>
          </div>
        </div>
        
        {/* Provider markers */}
        {sortedProviders.map((provider, index) => {
          // Create a slightly random position for visualization purposes
          const offsetX = Math.sin(index * 1.5) * 100;
          const offsetY = Math.cos(index * 1.5) * 100;
          const isSelected = provider.id === selectedProviderId;
          
          return (
            <div 
              key={provider.id} 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-all duration-300 hover:z-30"
              style={{ 
                left: `calc(50% + ${offsetX}px)`, 
                top: `calc(50% + ${offsetY}px)`,
                transform: isSelected ? 'translate(-50%, -50%) scale(1.1)' : 'translate(-50%, -50%)'
              }}
              onClick={() => handleSelectProvider(provider)}
            >
              <div className={`w-5 h-5 rounded-full ${isSelected ? 'bg-yellow-500 scale-125' : 'bg-red-500'} border-2 border-white shadow-lg`}></div>
              
              {/* Info bubble that shows on hover or selection */}
              <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <div className="bg-white py-1 px-2 rounded shadow-md text-xs">
                  <div className="font-medium">{provider.businessName}</div>
                  <div className="text-gray-500">{provider.distance} miles</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend and providers list */}
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 p-4 border-t border-gray-200 max-h-[280px] overflow-y-auto">
        <h3 className="font-medium text-gray-800 mb-2">Nearby Service Providers</h3>
        
        {selectedProviderId && selectedRepairer ? (
          <div className="mb-3 pb-3 border-b">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                {selectedRepairer.avatar ? (
                  <img 
                    src={selectedRepairer.avatar} 
                    alt={selectedRepairer.businessName} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-blue-500 text-xl">🔧</span>
                )}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{selectedRepairer.businessName}</h4>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="flex items-center mr-2">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="ml-1">{selectedRepairer.rating}</span>
                  </div>
                  <span className="mr-2">•</span>
                  <span>{selectedRepairer.completedJobs} jobs</span>
                </div>
              </div>
            </div>
            
            <div className="mt-2 text-sm text-gray-600">
              <p className="mb-1">{selectedRepairer.businessDescription?.substring(0, 100)}{selectedRepairer.businessDescription && selectedRepairer.businessDescription.length > 100 ? '...' : ''}</p>
              <p className="font-medium">{selectedRepairer.specializations?.join(', ')}</p>
            </div>
            
            <div className="flex mt-3 space-x-2">
              <a 
                href={`/repairer/${selectedRepairer.id}`} 
                className="flex-1 bg-white border border-blue-500 text-blue-600 py-2 px-3 rounded text-sm font-medium text-center hover:bg-blue-50 transition-colors"
              >
                View Profile
              </a>
              <a 
                href={`/vehicle-owner/service-request/new?repairerId=${selectedRepairer.id}`} 
                className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium text-center hover:bg-blue-700 transition-colors"
              >
                Request Service
              </a>
            </div>
          </div>
        ) : (
          <></>
        )}
        
        {sortedProviders.length === 0 ? (
          <p className="text-sm text-gray-500">No nearby service providers found.</p>
        ) : (
          <ul className="space-y-2">
            {sortedProviders.slice(0, 3).map(provider => (
              <li 
                key={provider.id}
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${selectedProviderId === provider.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                onClick={() => handleSelectProvider(provider)}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    {provider.avatar ? (
                      <img 
                        src={provider.avatar} 
                        alt={provider.businessName} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">🔧</span>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{provider.businessName}</div>
                    <div className="text-xs text-gray-500">{provider.specializations?.slice(0, 2).join(', ')}</div>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                    {provider.distance} mi
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
        
        <button className="w-full mt-2 text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Providers
        </button>
      </div>
    </div>
  );
}
