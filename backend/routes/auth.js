// backend/routes/auth.js
import express from 'express';
import config from '../config.js';

const router = express.Router();

// Redirect to Shopify OAuth page
router.get('/', (req, res) => {
  const shop = req.query.shop;
  if (!shop) {
    return res.status(400).send('Missing shop parameter');
  }
  const scopes = 'read_products,write_products';
  // **FILL THIS IN:** Replace with your actual callback URL
  const redirectUri = encodeURIComponent('https://your-app-url.com/auth/callback');
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${config.shopify.apiKey}&scope=${scopes}&redirect_uri=${redirectUri}&state=nonce&grant_options[]=per-user`;
  res.redirect(installUrl);
});

// OAuth callback endpoint
router.get('/callback', (req, res) => {
  // **FILL THIS IN:** Validate state and HMAC, then exchange the temporary code for a permanent access token.
  res.send('OAuth callback endpoint - process token exchange here.');
});

export default router;
