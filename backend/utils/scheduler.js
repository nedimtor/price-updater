// backend/utils/scheduler.js
import cron from 'node-cron';
import { syncAllProductPrices } from './shopify.js';

// Set up scheduled jobs for automatic price syncing
export function scheduleSyncJobs() {
  // Example: Run every hour (adjust based on user-configured frequency)
  cron.schedule('0 * * * *', async () => {
    console.log('Running scheduled price sync...');
    try {
      await syncAllProductPrices();
      console.log('Scheduled sync completed.');
    } catch (error) {
      console.error('Scheduled sync failed:', error);
    }
  });
}
