// frontend/src/components/DynamicPricing.jsx
import React from 'react';
import { Card, Heading, TextContainer, Button, Banner } from '@shopify/polaris';

const DynamicPricing = ({ currentUsage, currentTier, onUpgrade }) => {
  const upgradeNeeded = currentUsage > currentTier.limit;
  const shortfall = currentUsage - currentTier.limit;

  return (
    <Card title="API Call Usage & Subscription">
      <Card.Section>
        <TextContainer>
          <Heading>Your Current Subscription</Heading>
          <p>
            Tier: <strong>{currentTier.name}</strong> (Limit: {currentTier.limit} calls per sync)
          </p>
          <p>
            Your API call requirement for the next sync: <strong>{currentUsage} calls</strong>
          </p>
          {upgradeNeeded && (
            <Banner status="critical">
              <p>
                Warning: Your current subscription falls short by <strong>{shortfall} calls</strong>. Not all API calls will be executed. Please consider upgrading your subscription.
              </p>
            </Banner>
          )}
        </TextContainer>
      </Card.Section>
      <Card.Section>
        <Button primary onClick={onUpgrade}>
          Upgrade Subscription
        </Button>
      </Card.Section>
    </Card>
  );
};

export default DynamicPricing;
