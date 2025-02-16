// backend/utils/exchange.js
import axios from 'axios';
import config from '../config.js';

// Fetch the USD-to-TRY exchange rate from the primary API
export async function fetchExchangeRate() {
  try {
    const response = await axios.get(config.exchange.apiUrl);
    const data = response.data;
    return data.conversion_rates.TRY;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error;
  }
}
