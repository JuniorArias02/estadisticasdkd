import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AutenticacionProvider } from '@/store/autenticacion.store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AutenticacionProvider>
        {children}
      </AutenticacionProvider>
    </QueryClientProvider>
  );
};
