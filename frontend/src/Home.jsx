// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Page, Card, Button, Spinner, Layout } from '@shopify/polaris';
import axios from 'axios';
import DynamicPricing from '../components/DynamicPricing';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);
  // Example billing data; this should come from your backend billing endpoint
  const [billingData, setBillingData] = useState({
    currentUsage: 7000, // Example usage; replace with real data
    currentTier: { name: 'Basic', limit: 5000 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get('/products');
        // **FILL THIS IN:** Implement and call an endpoint to fetch the current exchange rate
        const rateResponse = await axios.get('/exchange-rate');
        setProducts(productsResponse.data);
        setExchangeRate(rateResponse.data.rate);
        // **FILL THIS IN:** Fetch billing data if available
        // const billingResponse = await axios.get('/billing/status');
        // setBillingData(billingResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSync = async () => {
    try {
      await axios.get('/sync/manual');
      alert('Prices synced successfully!');
    } catch (error) {
      console.error('Sync failed:', error);
      alert('Sync failed!');
    }
  };

  if (loading) return <Spinner />;

  return (
    <Page title="Currency Based Price Updater Dashboard">
      <Card sectioned>
        <p>Current Exchange Rate (USD to TRY): {exchangeRate || 'N/A'}</p>
        <Button primary onClick={handleSync}>Sync Prices Now</Button>
      </Card>
      <Layout>
        <Layout.Section>
          {/* **FILL THIS IN:** Implement a ProductTable component to list and edit products */}
          <p>List of products goes here.</p>
        </Layout.Section>
      </Layout>
      <DynamicPricing 
        currentUsage={billingData.currentUsage}
        currentTier={billingData.currentTier}
        onUpgrade={() => alert('Redirecting to upgrade flow...')}
      />
    </Page>
  );
};

export default Home;
