// Cleaned up by AI on 2025-06-18, see git history for previous versions.
import { useLDClient } from 'launchdarkly-react-client-sdk';
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useContextVersion } from '../context/ContextVersion';

/**
 * useFeatureFlag
 * @param flagKey - the flag key
 * @param defaultValue - the default value
 *
 * Usage:
 *   useFeatureFlag('myFlag', false)
 */
export const useFeatureFlag = (flagKey: string, defaultValue: any = false) => {
  const ldClient = useLDClient();
  const contextVersion = useContextVersion();
  const [value, setValue] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const isInitializedRef = useRef(false);
  const lastContextVersionRef = useRef<number | null>(null);

  // Memoize the flag key and default value to prevent unnecessary re-evaluations
  const memoizedFlagKey = useMemo(() => flagKey, [flagKey]);
  const memoizedDefaultValue = useMemo(() => defaultValue, [defaultValue]);

  const evaluateFlag = useCallback(async () => {
    if (!ldClient) {
      setIsLoading(false);
      return;
    }

    try {
      if (!isInitializedRef.current) {
        await ldClient.waitForInitialization();
        isInitializedRef.current = true;
      }
      const currentContext = ldClient.getContext();
      const flagValue = await ldClient.variation(memoizedFlagKey, memoizedDefaultValue);
      
      setValue(flagValue);
      
      console.log(`[LD] Flag Evaluation [${memoizedFlagKey}]`, {
        timestamp: new Date().toISOString(),
        flagKey: memoizedFlagKey,
        value: flagValue,
        defaultValue: memoizedDefaultValue,
        allFlags: ldClient.allFlags(),
        context: currentContext,
        clientInitialized: true,
        evaluationDetails: await ldClient.variationDetail(memoizedFlagKey, memoizedDefaultValue)
      });
    } catch (error) {
      console.error(`[LD] Error evaluating flag ${memoizedFlagKey}:`, error);
      setValue(memoizedDefaultValue);
    } finally {
      setIsLoading(false);
    }
  }, [ldClient, memoizedFlagKey, memoizedDefaultValue]);

  // Evaluate on mount, when ldClient, flagKey, or contextVersion changes
  useEffect(() => {
    if (ldClient) {
      const isContextChange = lastContextVersionRef.current !== null && lastContextVersionRef.current !== contextVersion;
      const isInitialMount = lastContextVersionRef.current === null;
      lastContextVersionRef.current = contextVersion;
      evaluateFlag();
    }
  }, [ldClient, memoizedFlagKey, contextVersion, evaluateFlag]);

  // Listen for flag changes
  useEffect(() => {
    if (!ldClient) return;

    const handleFlagChange = (changedFlags: any) => {
      if (changedFlags && (changedFlags[memoizedFlagKey] !== undefined || Object.keys(changedFlags).length === 0)) {
        console.log(`[LD] Flag change detected for [${memoizedFlagKey}]:`, {
          timestamp: new Date().toISOString(),
          flagKey: memoizedFlagKey,
          changedFlags
        });
        evaluateFlag();
      }
    };

    ldClient.on('change', handleFlagChange);
    return () => {
      ldClient.off('change', handleFlagChange);
    };
  }, [ldClient, memoizedFlagKey, evaluateFlag]);

  return { value, isLoading };
}; 