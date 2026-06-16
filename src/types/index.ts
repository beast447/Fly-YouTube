export type Difficulty = 'smooth' | 'turbulence' | 'hard';

export interface Creator {
  id: number;
  name: string;
  handle: string;
  routes: number;
  followers: string;
  gradient: string;
  following: boolean;
}

export interface Route {
  id: number;
  creatorId: number;
  dep: string;
  arr: string;
  name: string;
  duration: string;
  distance: string;
  altitude: string;
  aircraft: string;
  difficulty: Difficulty;
  pilots: number;
  isNew: boolean;
  gradient: string;
}

export type FlightStatus = 'complete';

export interface Flight {
  id: number;
  routeId: number;
  date: string;
  duration: string;
  distance: string;
  status: FlightStatus;
}

export interface AppContextValue {
  followedIds: Set<number>;
  loadedIds: Set<number>;
  toggleFollow: (id: number) => void;
  toggleLoaded: (id: number) => void;
}
