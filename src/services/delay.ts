const SIMULATED_LATENCY_MS = 300;

export function delay<T>(value: T, ms = SIMULATED_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
