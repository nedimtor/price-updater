// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import config from './config.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import syncRoutes from './routes/sync.js';
import { scheduleSyncJobs } from './utils/scheduler.js';

dotenv.config();

const app = express();
app.use(express.json());

// Register routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/sync', syncRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.send('Currency Based Price Updater Shopify App is running!');
});

// Start scheduled sync jobs
scheduleSyncJobs();

app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}`);
});
