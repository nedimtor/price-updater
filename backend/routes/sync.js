// backend/routes/sync.js
import express from 'express';
import { syncAllProductPrices } from '../utils/shopify.js';

const router = express.Router();

// GET /sync/manual - manual trigger for price sync
router.get('/manual', async (req, res) => {
  try {
    await syncAllProductPrices();
    res.json({ status: 'Prices updated successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sync prices' });
  }
});

export default router;
