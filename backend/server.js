import express from 'express';
import cors from 'cors';
import config from './config.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import syncRoutes from './routes/sync.js';
import { scheduleSyncJobs } from './utils/scheduler.js';

const app = express();

// Enable CORS for all origins (development only)
app.use(cors({ origin: '*' }));

app.use(express.json());

// Register routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/sync', syncRoutes);

app.get('/', (req, res) => {
  res.send('Currency Based Price Updater Shopify App is running!');
});

scheduleSyncJobs();

app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}`);
});
