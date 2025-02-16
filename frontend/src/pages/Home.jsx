// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Page, Card, Button, Spinner, Layout } from '@shopify/polaris';
import axios from 'axios';
import DynamicPricing from '../components/DynamicPricing';

function Home() {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [syncMessage, setSyncMessage] = useState('');
  const [products, setProducts] = useState([]);
  const billingData = {
    currentUsage: 7000,
    currentTier: { name: 'Basic', limit: 5000 },
  };

  // Get backend URL from environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products from the backend
        const productsResponse = await axios.get(`${backendUrl}/products`);
        setProducts(productsResponse.data);

        // Fetch the exchange rate from the backend
        // Your backend should return an object like { rate: number }
        const rateResponse = await axios.get(`${backendUrl}/exchange-rate`);
        setExchangeRate(rateResponse.data.rate);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [backendUrl]);

  const handleSync = async () => {
    setSyncMessage('Sync in progress...');
    try {
      const response = await axios.get(`${backendUrl}/sync/manual`);
      setSyncMessage(response.data.status || 'Prices updated successfully!');

      // Refresh exchange rate and product list after sync
      const rateResponse = await axios.get(`${backendUrl}/exchange-rate`);
      setExchangeRate(rateResponse.data.rate);

      const productsResponse = await axios.get(`${backendUrl}/products`);
      setProducts(productsResponse.data);
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncMessage('Sync failed!');
    }
  };

  if (exchangeRate === null) return <Spinner />;

  return (
    <Page title="Currency Based Price Updater Dashboard">
      <Card sectioned>
        <div style={{ marginBottom: '16px' }}>
          <h2>Current Exchange Rate (USD to TRY):</h2>
          <p>{exchangeRate}</p>
        </div>
        <Button primary onClick={handleSync}>
          Sync Prices Now
        </Button>
        {syncMessage && <p>{syncMessage}</p>}
      </Card>

      <Layout>
        <Layout.Section>
          <Card title="Products" sectioned>
            {products.length > 0 ? (
              products.map((product) => <p key={product.id}>{product.title}</p>)
            ) : (
              <p>No products found.</p>
            )}
          </Card>
        </Layout.Section>
      </Layout>

      <DynamicPricing 
        currentUsage={billingData.currentUsage}
        currentTier={billingData.currentTier}
        onUpgrade={() => alert('Redirecting to upgrade flow...')}
      />
    </Page>
  );
}

export default Home;
