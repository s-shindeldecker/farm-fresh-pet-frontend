import type { VercelRequest, VercelResponse } from '@vercel/node';
import { faker } from '@faker-js/faker';

const LD_SDK_KEY = process.env.LAUNCHDARKLY_SDK_KEY!;

function generateRandomUserContext() {
  const country = faker.helpers.arrayElement(['US', 'CA', 'FR', 'DE', 'UK']);
  const petType = faker.helpers.arrayElement(['dog', 'cat', 'both']);
  const planType = faker.helpers.arrayElement(['basic', 'premium', 'trial']);
  const paymentType = faker.helpers.arrayElement(['credit_card', 'paypal', 'apple_pay', 'google_pay', 'bank']);
  let state = '';
  if (country === 'US') state = faker.location.state();
  else if (country === 'CA') state = faker.helpers.arrayElement(['ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'NL', 'PE', 'YT', 'NT', 'NU']);
  else if (country === 'FR') state = faker.helpers.arrayElement(['Paris', 'Bouches-du-Rhône', 'Nord', 'Rhône', 'Haute-Garonne']);
  else if (country === 'DE') state = faker.helpers.arrayElement(['Berlin', 'Bavaria', 'North Rhine-Westphalia', 'Baden-Württemberg', 'Hesse']);
  else if (country === 'UK') state = faker.helpers.arrayElement(['Greater London', 'West Midlands', 'Greater Manchester', 'West Yorkshire', 'Kent']);

  return {
    key: faker.string.uuid(),
    anonymous: false,
    name: faker.person.fullName(),
    country,
    state,
    petType,
    planType,
    paymentType,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Dynamically import the CommonJS SDK inside the handler
    const LaunchDarkly = await import('launchdarkly-node-server-sdk');
    const { numUsers = 10 } = req.body || {};

    const ldClient = LaunchDarkly.init(LD_SDK_KEY);
    await ldClient.waitForInitialization();

    const results: any[] = [];

    for (let i = 0; i < numUsers; i++) {
      const user = generateRandomUserContext();
      const trialDays = await ldClient.variation('number-of-days-trial', user, 7);
      ldClient.track('trial_signup', user, { trialDays });
      results.push({ user, trialDays });
    }

    await ldClient.flush();
    await ldClient.close();

    res.status(200).json({ success: true, results });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || String(error) });
  }
} 