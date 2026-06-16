import { createContext } from 'react';
import type { AppContextValue } from '../types/index.ts';

export const AppContext = createContext<AppContextValue | null>(null);
