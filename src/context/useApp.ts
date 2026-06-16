import { useContext } from 'react';
import { AppContext } from './context.ts';
import type { AppContextValue } from '../types/index.ts';

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
}
