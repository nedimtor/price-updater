// backend/routes/products.js
import express from 'express';
import { updateProductMetafield, getProducts } from '../utils/shopify.js';

const router = express.Router();

// GET /products - list products (for dashboard display)
router.get('/', async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST /products/:id/metafield - create or update price_usd metafield for a product
router.post('/:id/metafield', async (req, res) => {
  const productId = req.params.id;
  const { price_usd } = req.body;
  try {
    const result = await updateProductMetafield(productId, price_usd);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update metafield' });
  }
});

export default router;
