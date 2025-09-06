# Shopify Storefront App - Hello World

A React + TypeScript application that connects to Shopify's Storefront API, designed to be embedded between existing theme header and footer.

## 🚀 Features

- **Shopify Integration**: Connects to Shopify Storefront API
- **React + TypeScript**: Modern development stack
- **Tailwind CSS**: Utility-first styling
- **Theme Integration**: Designed to embed seamlessly in Shopify themes
- **Responsive Design**: Mobile-first approach
- **Type Safety**: Full TypeScript support for Shopify API

## 📋 Prerequisites

- Node.js 18+ installed
- Shopify Partner account
- Shopify development store
- Storefront API access token

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
npm install
```

### 2. Environment Configuration

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Shopify credentials:
   ```env
   VITE_SHOPIFY_DOMAIN=your-shop-name
   VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
   VITE_APP_TITLE=Shopify Map App
   ```

### 3. Get Shopify Credentials

1. **Shopify Domain**: Your store's domain without `.myshopify.com`
2. **Storefront Access Token**:
   - Go to Shopify Admin → Apps → Manage private apps
   - Create a new private app
   - Enable Storefront API access
   - Copy the Storefront access token

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app!

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   └── ShopifyConnection.tsx
├── hooks/              # Custom React hooks
│   └── useShopify.ts
├── services/           # API services
│   └── shopify.ts
├── types/              # TypeScript definitions
│   └── shopify.ts
└── App.tsx             # Main application
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run check` - Type check without emitting

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your Git repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Build

```bash
npm run build
```

The `dist/` folder contains the production build.

## 🎯 Next Steps

- [ ] Add product display functionality
- [ ] Implement shopping cart integration
- [ ] Create Shopify app embed blocks
- [ ] Add theme CSS integration
- [ ] Implement user authentication
- [ ] Add analytics and tracking

## 📚 Documentation

- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
