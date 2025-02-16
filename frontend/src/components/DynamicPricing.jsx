/** @refresh reset */
import React from 'react';
import { Card, Button } from '@shopify/polaris';

const DynamicPricing = ({ currentUsage, currentTier, onUpgrade }) => {
  const upgradeNeeded = currentUsage > currentTier.limit;
  const shortfall = currentUsage - currentTier.limit;

  return (
    <Card title="API Call Usage & Subscription" sectioned>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h2>Your Current Subscription</h2>
        <p>
          Tier: <strong>{currentTier.name}</strong> (Limit: {currentTier.limit} calls per sync)
        </p>
        <p>
          Required API calls for next sync: <strong>{currentUsage} calls</strong>
        </p>
        {upgradeNeeded && (
          <div style={{ backgroundColor: '#fdecea', padding: '8px', borderRadius: '4px' }}>
            <p>
              Warning: Your subscription falls short by <strong>{shortfall} calls</strong>.
              Not all API calls will execute. Please consider upgrading your subscription.
            </p>
          </div>
        )}
      </div>
      <div style={{ marginTop: '16px' }}>
        <Button primary onClick={onUpgrade}>
          Upgrade Subscription
        </Button>
      </div>
    </Card>
  );
};

export default DynamicPricing;
