import { useLDClient, useFlags } from 'launchdarkly-react-client-sdk';
import { useEffect, useState } from 'react';

export const useFeatureFlag = (flagKey: string, defaultValue: any = false) => {
  const ldClient = useLDClient();
  const flags = useFlags();
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const initializeFlag = async () => {
      try {
        await ldClient?.waitUntilReady();
        const flagValue = flags[flagKey] ?? defaultValue;
        setValue(flagValue);
        
        // Track the impression
        ldClient?.track('flag_impression', {
          flagKey,
          value: flagValue
        });
      } catch (error) {
        console.error(`Error loading feature flag ${flagKey}:`, error);
        setValue(defaultValue);
      } finally {
        setIsLoading(false);
      }
    };

    initializeFlag();
  }, [ldClient, flagKey, defaultValue, flags]);

  return { value, isLoading };
}; 