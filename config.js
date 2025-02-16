// backend/config.js
import dotenv from 'dotenv';
dotenv.config();

const config = {
  shopify: {
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecret: process.env.SHOPIFY_API_SECRET,
    storeUrl: process.env.SHOPIFY_STORE_URL,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  },
  exchange: {
    apiUrl: process.env.EXCHANGE_RATE_API_URL,
  },
  app: {
    port: process.env.PORT || 3000,
  },
};

export default config;
