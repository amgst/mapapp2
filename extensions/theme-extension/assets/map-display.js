/**
 * Map Display JavaScript
 * Handles Google Maps integration for simple map display
 */

class MapDisplay {
  constructor(element) {
    this.element = element;
    this.map = null;
    this.marker = null;
    this.infoWindow = null;
    
    this.init();
  }

  init() {
    // Get configuration from data attributes
    this.apiKey = this.element.dataset.apiKey;
    this.mapHeight = this.element.dataset.mapHeight || '400px';
    this.latitude = parseFloat(this.element.dataset.latitude);
    this.longitude = parseFloat(this.element.dataset.longitude);
    this.locationName = this.element.dataset.locationName || 'Our Location';
    this.locationAddress = this.element.dataset.locationAddress || '';
    this.zoomLevel = parseInt(this.element.dataset.zoomLevel) || 15;
    this.showControls = this.element.dataset.showControls !== 'false';
    this.showStreetView = this.element.dataset.showStreetView !== 'false';
    this.showFullscreen = this.element.dataset.showFullscreen !== 'false';
    this.markerColor = this.element.dataset.markerColor || '#007bff';

    if (!this.apiKey) {
      console.error('Google Maps API key is required');
      this.showError('Google Maps API key is required. Please configure it in the theme customizer.');
      return;
    }

    if (!this.latitude || !this.longitude) {
      console.error('Location coordinates are required');
      this.showError('Location coordinates are required. Please configure them in the theme customizer.');
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
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => this.initializeMap();
    script.onerror = () => this.showError('Failed to load Google Maps API');
    document.head.appendChild(script);
  }

  initializeMap() {
    const mapContainer = this.element.querySelector('.map-display__map');
    if (!mapContainer) return;

    // Set map height
    mapContainer.style.height = this.mapHeight;

    // Location coordinates
    const location = { lat: this.latitude, lng: this.longitude };
    
    // Initialize map
    this.map = new google.maps.Map(mapContainer, {
      zoom: this.zoomLevel,
      center: location,
      mapTypeControl: this.showControls,
      streetViewControl: this.showStreetView,
      fullscreenControl: this.showFullscreen,
      zoomControl: this.showControls,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: this.getMapStyles()
    });

    // Add marker
    this.addMarker(location);

    // Setup info window
    this.setupInfoWindow();
  }

  addMarker(location) {
    // Create custom marker icon
    const markerIcon = {
      url: this.createMarkerSVG(),
      scaledSize: new google.maps.Size(40, 40),
      anchor: new google.maps.Point(20, 40)
    };

    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: this.locationName,
      icon: markerIcon,
      animation: google.maps.Animation.DROP
    });

    // Add click listener to marker
    this.marker.addListener('click', () => {
      if (this.infoWindow) {
        this.infoWindow.open(this.map, this.marker);
      }
    });
  }

  createMarkerSVG() {
    const svg = `
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        <path d="M20 2C13.383 2 8 7.383 8 14c0 9 12 22 12 22s12-13 12-22c0-6.617-5.383-12-12-12z" 
              fill="${this.markerColor}" 
              stroke="white" 
              stroke-width="2" 
              filter="url(#shadow)"/>
        <circle cx="20" cy="14" r="6" fill="white"/>
        <circle cx="20" cy="14" r="3" fill="${this.markerColor}"/>
      </svg>
    `;
    
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  setupInfoWindow() {
    if (!this.locationName && !this.locationAddress) return;

    const content = `
      <div style="padding: 10px; max-width: 250px;">
        <h3 style="margin: 0 0 8px 0; font-size: 1.1rem; color: #333;">${this.locationName}</h3>
        ${this.locationAddress ? `<p style="margin: 0 0 10px 0; color: #666; line-height: 1.4;">${this.locationAddress}</p>` : ''}
        <a href="https://www.google.com/maps/dir/?api=1&destination=${this.latitude},${this.longitude}" 
           target="_blank" 
           style="display: inline-block; padding: 6px 12px; background: ${this.markerColor}; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem;">
          Get Directions
        </a>
      </div>
    `;

    this.infoWindow = new google.maps.InfoWindow({
      content: content
    });
  }

  getMapStyles() {
    // Optional: Return custom map styles for better appearance
    return [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ];
  }

  showError(message) {
    const mapContainer = this.element.querySelector('.map-display__map');
    if (mapContainer) {
      mapContainer.innerHTML = `
        <div class="map-display__error" style="height: ${this.mapHeight};">
          <div>
            <span class="map-display__error-icon">⚠️</span>
            <p style="margin: 0; font-size: 1.1rem;">${message}</p>
          </div>
        </div>
      `;
    }
  }

  // Public methods for external control
  setLocation(lat, lng, name = null, address = null) {
    this.latitude = lat;
    this.longitude = lng;
    if (name) this.locationName = name;
    if (address) this.locationAddress = address;

    if (this.map && this.marker) {
      const newLocation = { lat: lat, lng: lng };
      this.marker.setPosition(newLocation);
      this.map.setCenter(newLocation);
      
      if (this.infoWindow) {
        this.setupInfoWindow();
      }
    }
  }

  setZoom(level) {
    if (this.map) {
      this.map.setZoom(level);
    }
  }

  showInfoWindow() {
    if (this.infoWindow && this.marker) {
      this.infoWindow.open(this.map, this.marker);
    }
  }

  hideInfoWindow() {
    if (this.infoWindow) {
      this.infoWindow.close();
    }
  }
}

// Initialize map displays when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const mapDisplays = document.querySelectorAll('.map-display[data-api-key]');
  mapDisplays.forEach(element => {
    new MapDisplay(element);
  });
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MapDisplay;
}