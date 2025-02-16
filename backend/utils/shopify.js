// backend/utils/shopify.js
import axios from 'axios';
import config from '../config.js';
import { fetchExchangeRate } from './exchange.js';

// Fetch all products from Shopify
export async function getProducts() {
  const url = `https://${config.shopify.storeUrl}/admin/api/2023-01/products.json`;
  const headers = { "X-Shopify-Access-Token": config.shopify.accessToken };
  const response = await axios.get(url, { headers });
  return response.data.products;
}

// Create or update the price_usd metafield for a product
export async function updateProductMetafield(productId, priceUSD) {
  const url = `https://${config.shopify.storeUrl}/admin/api/2023-01/products/${productId}/metafields.json`;
  const headers = { "X-Shopify-Access-Token": config.shopify.accessToken };
  const payload = {
    metafield: {
      namespace: 'custom',
      key: 'price_usd',
      value: priceUSD.toString(),
      type: 'number_decimal'
    }
  };
  const response = await axios.post(url, payload, { headers });
  return response.data;
}

// Sync all product prices: fetch products, convert USD to TRY, and update prices
export async function syncAllProductPrices() {
  const exchangeRate = await fetchExchangeRate();
  const products = await getProducts();
  
  for (const product of products) {
    const productId = product.id;
    // **FILL THIS IN:** Implement logic to retrieve the price_usd metafield for this product.
    let priceUSD = null; // Retrieve this via additional API call if needed.
    if (priceUSD !== null) {
      const newTRYPrice = Math.round(priceUSD * exchangeRate);
      console.log(`Updating ${product.title}: USD ${priceUSD} -> TRY ${newTRYPrice}`);
      // **FILL THIS IN:** Update the product's price variant via Shopify API.
    } else {
      console.log(`Skipping ${product.title}: price_usd metafield not found.`);
    }
  }
}
