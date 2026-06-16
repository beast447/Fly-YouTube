import { MY_FLIGHTS, ROUTES } from '../data/routes.ts';
import type { Flight, Route } from '../types/index.ts';
import { delay } from './delay.ts';

export function getRoutes(): Promise<Route[]> {
  return delay(ROUTES);
}

export function getRouteById(id: number): Promise<Route | undefined> {
  return delay(ROUTES.find((r) => r.id === id));
}

export function getRoutesByCreatorId(creatorId: number): Promise<Route[]> {
  return delay(ROUTES.filter((r) => r.creatorId === creatorId));
}

export function getMyFlights(): Promise<Flight[]> {
  return delay(MY_FLIGHTS);
}
