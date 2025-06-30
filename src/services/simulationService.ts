import { faker } from '@faker-js/faker';
import type { UserProfile } from '../context/UserContext';
import config from '../config/simulation.json';

// Type definitions
interface SimulationConfig {
  duration: number;
  recordsPerSecond: number;
  experiments: {
    [key: string]: {
      flag: string;
      outcomeMetrics: string[];
      conversionRates: {
        [metric: string]: {
          [country: string]: number;
        };
      };
      trialDurationMultiplier?: {
        [days: string]: number;
      };
    };
  };
  userGeneration: {
    countries: string[];
    petTypes: string[];
    planTypes: string[];
    paymentTypes: string[];
  };
  randomness: {
    noiseLevel: number;
    timeVariation: boolean;
  };
}

const defaultConfig: SimulationConfig = config as SimulationConfig;

export class SimulationService {
  private config: SimulationConfig;
  private isRunning: boolean = false;
  private intervalId: NodeJS.Timeout | null = null;
  private onProgress?: (progress: SimulationProgress) => void;
  private onComplete?: (results: SimulationResults) => void;

  constructor(configOverride?: Partial<SimulationConfig>) {
    this.config = { ...defaultConfig, ...configOverride };
  }

  private generateUserContext(): UserProfile {
    const country = faker.helpers.arrayElement(this.config.userGeneration.countries);
    const petType = faker.helpers.arrayElement(this.config.userGeneration.petTypes);
    const planType = faker.helpers.arrayElement(this.config.userGeneration.planTypes);
    const paymentType = faker.helpers.arrayElement(this.config.userGeneration.paymentTypes);
    let state = '';
    if (country === 'US') state = faker.location.state();
    else if (country === 'CA') state = faker.helpers.arrayElement(['ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'NL', 'PE', 'YT', 'NT', 'NU']);
    else if (country === 'FR') state = faker.helpers.arrayElement(['Paris', 'Bouches-du-Rhône', 'Nord', 'Rhône', 'Haute-Garonne']);
    else if (country === 'DE') state = faker.helpers.arrayElement(['Berlin', 'Bavaria', 'North Rhine-Westphalia', 'Baden-Württemberg', 'Hesse']);
    else if (country === 'UK') state = faker.helpers.arrayElement(['Greater London', 'West Midlands', 'Greater Manchester', 'West Yorkshire', 'Kent']);
    return {
      key: faker.internet.username() + '-' + faker.string.uuid(),
      anonymous: false,
      name: faker.person.fullName(),
      country,
      state,
      petType,
      planType,
      paymentType,
    };
  }

  private async evaluateFlags(userContext: UserProfile) {
    const context = {
      key: userContext.key,
      anonymous: false,
      name: userContext.name,
      country: userContext.country,
      state: userContext.state,
      custom: {
        petType: userContext.petType,
        planType: userContext.planType,
        paymentType: userContext.paymentType,
      }
    };
    // Evaluate all three flags
    const trialDays = await this.ldClient.variation('number-of-days-trial', 7, context);
    const seasonalBanner = await this.ldClient.variation('seasonal-sale-banner-text', '', context);
    const heroBanner = await this.ldClient.variation('hero-banner-text', {}, context);
    return { trialDays, seasonalBanner, heroBanner };
  }

  private addRandomness(baseRate: number): number {
    const noise = (Math.random() - 0.5) * 2 * this.config.randomness.noiseLevel;
    return Math.max(0, Math.min(1, baseRate + noise));
  }

  private shouldFireEvent(metric: string, country: string, flagValues: any): boolean {
    const region = country === 'FR' || country === 'DE' ? 'EU' : country;
    // Get base conversion rate
    let baseRate = 0;
    for (const experiment of Object.values(this.config.experiments)) {
      if (experiment.outcomeMetrics.includes(metric)) {
        baseRate = experiment.conversionRates[metric]?.[region] || 0;
        break;
      }
    }
    // Apply trial duration multiplier if applicable
    if (metric === 'trial_signup' && flagValues.trialDays) {
      const multiplier = this.config.experiments.trial_duration.trialDurationMultiplier?.[flagValues.trialDays.toString()] || 1.0;
      baseRate *= multiplier;
    }
    // Add randomness
    const finalRate = this.addRandomness(baseRate);
    return Math.random() < finalRate;
  }

  private async simulateUserJourney(userContext: UserProfile) {
    // Evaluate all flags
    const flagValues = await this.evaluateFlags(userContext);
    // Simulate events
    const events: string[] = ['page_view'];
    if (this.shouldFireEvent('trial_signup', userContext.country!, flagValues)) {
      events.push('trial_signup');
      // Simulate trial to paid conversion
      if (this.shouldFireEvent('trial_to_paid_conversion', userContext.country!, flagValues)) {
        events.push('trial_to_paid_conversion');
        events.push('total_revenue');
      }
    }
    if (flagValues.seasonalBanner && this.shouldFireEvent('banner_click', userContext.country!, flagValues)) {
      events.push('banner_click');
    }
    if (this.shouldFireEvent('hero_engagement', userContext.country!, flagValues)) {
      events.push('hero_engagement');
    }
    return { userContext, flagValues, events };
  }

  public async startSimulation(
    onProgress?: (progress: SimulationProgress) => void,
    onComplete?: (results: SimulationResults) => void
  ) {
    if (this.isRunning) return;
    this.isRunning = true;
    this.onProgress = onProgress;
    this.onComplete = onComplete;
    const startTime = Date.now();
    const totalRecords = this.config.duration * this.config.recordsPerSecond;
    let currentRecord = 0;
    const results: SimulationResults = {
      totalUsers: 0,
      events: {},
      flagEvaluations: {},
      duration: 0
    };
    const runBatch = async () => {
      if (!this.isRunning) return;
      const batchSize = Math.min(this.config.recordsPerSecond, totalRecords - currentRecord);
      for (let i = 0; i < batchSize; i++) {
        const userContext = this.generateUserContext();
        const journey = await this.simulateUserJourney(userContext);
        // Track results
        results.totalUsers++;
        journey.events.forEach(event => {
          results.events[event] = (results.events[event] || 0) + 1;
        });
        // Track flag evaluations
        Object.entries(journey.flagValues).forEach(([flag, value]) => {
          if (!results.flagEvaluations[flag]) results.flagEvaluations[flag] = {};
          const valueStr = typeof value === 'object' ? JSON.stringify(value) : String(value);
          results.flagEvaluations[flag][valueStr] = (results.flagEvaluations[flag][valueStr] || 0) + 1;
        });
        currentRecord++;
      }
      // Report progress
      if (this.onProgress) {
        this.onProgress({
          currentRecord,
          totalRecords,
          percentage: (currentRecord / totalRecords) * 100,
          results: { ...results }
        });
      }
      // Check if complete
      if (currentRecord >= totalRecords) {
        this.stopSimulation();
        results.duration = Date.now() - startTime;
        if (this.onComplete) {
          this.onComplete(results);
        }
        return;
      }
      // Schedule next batch
      this.intervalId = setTimeout(runBatch, 1000);
    };
    runBatch();
  }

  public stopSimulation() {
    this.isRunning = false;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  public isSimulationRunning(): boolean {
    return this.isRunning;
  }
}

export interface SimulationProgress {
  currentRecord: number;
  totalRecords: number;
  percentage: number;
  results: SimulationResults;
}

export interface SimulationResults {
  totalUsers: number;
  events: { [key: string]: number };
  flagEvaluations: { [flag: string]: { [value: string]: number } };
  duration: number;
} 