import { LDProvider } from 'launchdarkly-react-client-sdk';
import type { ReactNode } from 'react';
import { useUser } from './UserContext';

interface LDContextProps {
  children: ReactNode;
}

export const LDContextProvider = ({ children }: LDContextProps) => {
  const clientSideID = import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID;
  const { user } = useUser();

  return (
    <LDProvider
      clientSideID={clientSideID}
      context={{
        kind: 'user',
        ...user,
      }}
      options={{
        bootstrap: 'localStorage',
        streaming: true,
      }}
    >
      {children}
    </LDProvider>
  );
}; 