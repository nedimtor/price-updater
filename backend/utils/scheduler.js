// backend/utils/scheduler.js
import cron from 'node-cron';
import { syncAllProductPrices } from './shopify.js';

// Set up scheduled jobs for automatic price syncing.
// **FILL THIS IN:** Adjust the cron expression based on merchant settings if needed.
export function scheduleSyncJobs() {
  // Example: Run every hour
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
