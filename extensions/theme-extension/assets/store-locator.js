/**
 * Store Locator JavaScript
 * Handles Google Maps integration and store search functionality
 */

class StoreLocator {
  constructor(element) {
    this.element = element;
    this.map = null;
    this.markers = [];
    this.stores = [];
    this.geocoder = null;
    this.infoWindow = null;
    
    this.init();
  }

  init() {
    // Get configuration from data attributes
    this.apiKey = this.element.dataset.apiKey;
    this.mapHeight = this.element.dataset.mapHeight || '400px';
    
    // Parse stores data
    try {
      this.stores = JSON.parse(this.element.dataset.stores || '[]');
    } catch (e) {
      console.error('Error parsing stores data:', e);
      this.stores = [];
    }

    if (!this.apiKey) {
      console.error('Google Maps API key is required');
      this.showError('Google Maps API key is required. Please configure it in the theme customizer.');
      return;
    }

    this.loadGoogleMaps();
  }

  loadGoogleMaps() {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      this.initializeMap();
      return;
    }

    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=geometry,places`;
    script.async = true;
    script.defer = true;
    script.onload = () => this.initializeMap();
    script.onerror = () => this.showError('Failed to load Google Maps API');
    document.head.appendChild(script);
  }

  initializeMap() {
    const mapContainer = this.element.querySelector('.store-locator__map');
    if (!mapContainer) return;

    // Set map height
    mapContainer.style.height = this.mapHeight;

    // Default center (can be customized)
    const defaultCenter = { lat: 40.7128, lng: -74.0060 }; // New York City
    
    // Initialize map
    this.map = new google.maps.Map(mapContainer, {
      zoom: 10,
      center: defaultCenter,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true
    });

    // Initialize geocoder and info window
    this.geocoder = new google.maps.Geocoder();
    this.infoWindow = new google.maps.InfoWindow();

    // Add store markers
    this.addStoreMarkers();

    // Setup search functionality
    this.setupSearch();

    // Fit map to show all markers
    this.fitMapToMarkers();
  }

  addStoreMarkers() {
    this.stores.forEach((store, index) => {
      if (store.latitude && store.longitude) {
        const position = {
          lat: parseFloat(store.latitude),
          lng: parseFloat(store.longitude)
        };

        const marker = new google.maps.Marker({
          position: position,
          map: this.map,
          title: store.name,
          animation: google.maps.Animation.DROP
        });

        // Create info window content
        const infoContent = this.createInfoWindowContent(store);
        
        marker.addListener('click', () => {
          this.infoWindow.setContent(infoContent);
          this.infoWindow.open(this.map, marker);
        });

        this.markers.push(marker);
      }
    });
  }

  createInfoWindowContent(store) {
    return `
      <div class="store-info">
        <h3 style="margin: 0 0 10px 0; font-size: 1.1rem;">${store.name}</h3>
        <p style="margin: 0 0 8px 0; color: #666;">${store.address}</p>
        ${store.phone ? `<p style="margin: 0 0 8px 0; color: #666;">📞 ${store.phone}</p>` : ''}
        ${store.hours ? `<p style="margin: 0 0 10px 0; color: #666; font-size: 0.9rem;">🕒 ${store.hours}</p>` : ''}
        <a href="https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}" 
           target="_blank" 
           style="display: inline-block; padding: 6px 12px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem;">
          Get Directions
        </a>
      </div>
    `;
  }

  setupSearch() {
    const searchInput = this.element.querySelector('.store-locator__search-input');
    const searchButton = this.element.querySelector('.store-locator__search-button');
    
    if (!searchInput || !searchButton) return;

    const performSearch = () => {
      const query = searchInput.value.trim();
      if (!query) return;

      this.searchNearby(query);
    };

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  searchNearby(query) {
    if (!this.geocoder) return;

    this.geocoder.geocode({ address: query }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const searchLocation = results[0].geometry.location;
        
        // Center map on search location
        this.map.setCenter(searchLocation);
        this.map.setZoom(12);

        // Add search marker
        if (this.searchMarker) {
          this.searchMarker.setMap(null);
        }
        
        this.searchMarker = new google.maps.Marker({
          position: searchLocation,
          map: this.map,
          title: 'Search Location',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="8" fill="#ff4444" stroke="white" stroke-width="2"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(32, 32)
          }
        });

        // Find and highlight nearby stores
        this.highlightNearbyStores(searchLocation);
      } else {
        alert('Location not found. Please try a different search term.');
      }
    });
  }

  highlightNearbyStores(searchLocation) {
    const storesList = this.element.querySelector('.store-locator__stores');
    if (!storesList) return;

    // Calculate distances and sort stores
    const storesWithDistance = this.stores.map((store, index) => {
      if (store.latitude && store.longitude) {
        const storeLocation = new google.maps.LatLng(store.latitude, store.longitude);
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
          searchLocation,
          storeLocation
        );
        return { ...store, distance, index };
      }
      return { ...store, distance: Infinity, index };
    }).sort((a, b) => a.distance - b.distance);

    // Update stores list order
    this.updateStoresList(storesWithDistance);
  }

  updateStoresList(sortedStores) {
    const storesList = this.element.querySelector('.store-locator__stores');
    if (!storesList) return;

    storesList.innerHTML = '';

    sortedStores.forEach(store => {
      if (store.distance < 50000) { // Show stores within 50km
        const storeElement = this.createStoreElement(store);
        storesList.appendChild(storeElement);
      }
    });

    if (storesList.children.length === 0) {
      storesList.innerHTML = '<div class="store-locator__no-results">No stores found within 50km of your search location.</div>';
    }
  }

  createStoreElement(store) {
    const div = document.createElement('div');
    div.className = 'store-locator__store';
    
    const distanceText = store.distance < Infinity 
      ? `<small style="color: #28a745; font-weight: bold;">${(store.distance / 1000).toFixed(1)}km away</small>`
      : '';

    div.innerHTML = `
      <div class="store-locator__store-name">${store.name} ${distanceText}</div>
      <div class="store-locator__store-address">${store.address}</div>
      ${store.phone ? `<div class="store-locator__store-phone">📞 ${store.phone}</div>` : ''}
      ${store.hours ? `<div class="store-locator__store-hours">🕒 ${store.hours}</div>` : ''}
      <a href="https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}" 
         target="_blank" 
         class="store-locator__directions">
        Get Directions
      </a>
    `;

    // Add click handler to focus on marker
    div.addEventListener('click', () => {
      if (this.markers[store.index]) {
        this.map.setCenter(this.markers[store.index].getPosition());
        this.map.setZoom(15);
        google.maps.event.trigger(this.markers[store.index], 'click');
      }
    });

    return div;
  }

  fitMapToMarkers() {
    if (this.markers.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    this.markers.forEach(marker => {
      bounds.extend(marker.getPosition());
    });

    this.map.fitBounds(bounds);
    
    // Ensure minimum zoom level
    google.maps.event.addListenerOnce(this.map, 'bounds_changed', () => {
      if (this.map.getZoom() > 15) {
        this.map.setZoom(15);
      }
    });
  }

  showError(message) {
    const mapContainer = this.element.querySelector('.store-locator__map');
    if (mapContainer) {
      mapContainer.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: ${this.mapHeight}; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; color: #6c757d; text-align: center; padding: 20px;">
          <div>
            <p style="margin: 0; font-size: 1.1rem;">⚠️ ${message}</p>
          </div>
        </div>
      `;
    }
  }
}

// Initialize store locators when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const storeLocators = document.querySelectorAll('.store-locator[data-api-key]');
  storeLocators.forEach(element => {
    new StoreLocator(element);
  });
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StoreLocator;
}