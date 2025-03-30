'use client';

import { ErrorType, IApiError } from '@/domain/models/api';
import { IServices } from '@/domain/models/services';
import { createContext, useContext } from 'react';

const ServicesContext = createContext<IServices | null>(null);

export function ServicesProvider({
  children,
  services,
}: {
  children: React.ReactNode;
  services: IServices;
}) {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);

  if (!context) {
    throw new Error(
      `${ErrorType.GENERIC} - useServices must be used within ServicesProvider`
    ) as IApiError;
  }

  return context;
}
