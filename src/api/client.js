const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('fy_token');

  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error ?? `Request failed (${response.status})`);
  }

  return payload;
}

export const api = {
  getCreators: () => request('/creators'),
  getRoutes: (search = '') => request(`/routes${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  getFlights: () => request('/flights'),
  getFollows: () => request('/follows'),
  toggleFollow: (creatorId) => request(`/follows/${creatorId}`, { method: 'POST' }),
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (email, password, username) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify({ email, password, username }) }),
  me: () => request('/auth/me'),
};
