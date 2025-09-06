# Shopify App Setup Guide

## Overview
This project has been converted from a standalone React app into a proper Shopify app with theme extensions. The app provides map functionality that integrates natively with Shopify themes without requiring iframes.

## Project Structure
```
mapapp2/
├── shopify.app.toml                 # Main app configuration
├── extensions/
│   └── theme-extension/
│       ├── shopify.extension.toml   # Extension configuration
│       ├── blocks/                  # App blocks for theme customizer
│       │   ├── store-locator.liquid # Store locator with search
│       │   └── map-display.liquid   # Simple map display
│       ├── sections/                # Theme sections
│       │   └── map-section.liquid   # Map section template
│       └── snippets/                # Reusable templates
│           ├── store-locator-block.liquid
│           └── map-display-block.liquid
├── src/                            # Original React app (for reference)
└── package.json                    # Updated with Shopify CLI scripts
```

## Setup Instructions

### 1. Prerequisites
- Node.js 18+ installed
- Shopify CLI installed globally: `npm install -g @shopify/cli`
- Access to a Shopify development store
- Google Maps API key

### 2. Initial Setup
1. Clone/navigate to the project directory
2. Install dependencies: `npm install`
3. Configure your Shopify app:
   ```bash
   shopify app auth
   ```

### 3. App Configuration
1. Update `shopify.app.toml` with your app details:
   - Set `client_id` (obtained from Shopify Partners dashboard)
   - Update `application_url` if different
   - Modify `dev_store_url` to your development store

2. Configure Google Maps API:
   - Get a Google Maps API key with Maps JavaScript API enabled
   - The API key will be configured in the theme customizer

### 4. Development

#### Start Development Server
```bash
npm run shopify:dev
```
This will:
- Start the Shopify app development server
- Create a tunnel for local development
- Install the app on your development store

#### Build Extensions
```bash
npm run extension:build
```

#### Deploy Extensions
```bash
npm run extension:deploy
```

### 5. Using the App in Shopify

#### Method 1: Theme Customizer (Recommended)
1. Go to your Shopify admin → Online Store → Themes
2. Click "Customize" on your active theme
3. Add a new section and look for "Map Section"
4. Or add app blocks to existing sections:
   - "Store Locator" - Full store locator with search
   - "Map Display" - Simple map display

#### Method 2: Manual Theme Integration
Add the following to your theme templates:

```liquid
<!-- For store locator -->
{% render 'store-locator-block', block: block %}

<!-- For simple map display -->
{% render 'map-display-block', block: block %}
```

### 6. Configuration Options

#### Store Locator Block Settings:
- Title and description
- Google Maps API key
- Search functionality
- Multiple store locations (up to 10)
- Styling options (colors, layout)

#### Map Display Block Settings:
- Title and description
- Google Maps API key
- Single location (latitude/longitude)
- Map controls (zoom, street view, etc.)
- Marker customization
- Styling options

### 7. Available Scripts

```bash
# Development
npm run dev                 # Start Vite dev server (original React app)
npm run shopify:dev         # Start Shopify app development

# Building
npm run build              # Build React app
npm run extension:build    # Build Shopify extensions
npm run shopify:build      # Build entire Shopify app

# Deployment
npm run extension:deploy   # Deploy extensions only
npm run shopify:deploy     # Deploy entire app

# Utilities
npm run shopify:info       # Show app information
npm run shopify:generate   # Generate new extensions/components
```

### 8. Troubleshooting

#### Common Issues:

1. **"Google Maps API key required" error**
   - Ensure you've added a valid Google Maps API key in the block settings
   - Enable Maps JavaScript API in Google Cloud Console

2. **App blocks not appearing in theme customizer**
   - Make sure extensions are deployed: `npm run extension:deploy`
   - Check that the app is installed on your store
   - Verify theme compatibility (works with Online Store 2.0 themes)

3. **Build errors**
   - Ensure all required fields in `shopify.app.toml` are filled
   - Check that Shopify CLI is properly authenticated

4. **Maps not loading**
   - Verify Google Maps API key is correct
   - Check browser console for JavaScript errors
   - Ensure API key has proper permissions and billing enabled

### 9. Next Steps

1. **Customize Styling**: Modify the CSS in the liquid templates to match your brand
2. **Add More Locations**: Use the store settings to add multiple store locations
3. **Enhanced Features**: Consider adding:
   - Directions integration
   - Store hours and contact information
   - Custom map markers
   - Mobile optimization

### 10. Support

For issues related to:
- **Shopify App Development**: [Shopify App CLI Documentation](https://shopify.dev/docs/apps/tools/cli)
- **Theme Extensions**: [Theme App Extensions Guide](https://shopify.dev/docs/apps/online-store/theme-app-extensions)
- **Google Maps**: [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)

## Important Notes

- This app uses theme app extensions, which require Online Store 2.0 compatible themes
- The original React app code is preserved in the `src/` directory for reference
- All map functionality is now embedded directly in Shopify themes without iframes
- The app integrates seamlessly with Shopify's theme customizer for easy configuration