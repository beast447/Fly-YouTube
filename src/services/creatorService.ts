import { CREATORS } from '../data/creators.ts';
import type { Creator } from '../types/index.ts';
import { delay } from './delay.ts';

export function getCreators(): Promise<Creator[]> {
  return delay(CREATORS);
}

export function getCreatorById(id: number): Promise<Creator | undefined> {
  return delay(CREATORS.find((c) => c.id === id));
}
