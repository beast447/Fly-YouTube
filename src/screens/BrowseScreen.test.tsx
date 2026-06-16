import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import BrowseScreen from './BrowseScreen.tsx';
import { AppProvider } from '../context/AppContext.tsx';
import type { Creator, Route } from '../types/index.ts';

const mockRoutes: Route[] = [
  {
    id: 1,
    creatorId: 1,
    dep: 'EGLL',
    arr: 'KJFK',
    name: 'Transatlantic Classic',
    duration: '7h 22m',
    distance: '3,459 nm',
    altitude: 'FL350',
    aircraft: 'A320neo',
    difficulty: 'smooth',
    pilots: 847,
    isNew: true,
    gradient: 'linear-gradient(160deg,#000,#111)',
  },
  {
    id: 2,
    creatorId: 2,
    dep: 'KLAX',
    arr: 'YSSY',
    name: 'Pacific Haul',
    duration: '15h 40m',
    distance: '7,488 nm',
    altitude: 'FL380',
    aircraft: 'B777-300ER',
    difficulty: 'turbulence',
    pilots: 1204,
    isNew: false,
    gradient: 'linear-gradient(160deg,#000,#111)',
  },
];

const mockCreators: Creator[] = [
  {
    id: 1,
    name: 'Captain Joe',
    handle: '@captainjoe',
    routes: 127,
    followers: '2.1M',
    gradient: 'linear-gradient(135deg,#000,#111)',
    following: true,
  },
];

vi.mock('../services/index.ts', () => ({
  getRoutes: () => Promise.resolve(mockRoutes),
  getCreators: () => Promise.resolve(mockCreators),
}));

function renderBrowseScreen() {
  return render(
    <MemoryRouter>
      <AppProvider>
        <BrowseScreen />
      </AppProvider>
    </MemoryRouter>
  );
}

describe('BrowseScreen', () => {
  it('loads and displays routes', async () => {
    renderBrowseScreen();
    await waitFor(() => expect(screen.getByText('Transatlantic Classic')).toBeInTheDocument());
    expect(screen.getByText('Pacific Haul')).toBeInTheDocument();
  });

  it('filters routes by debounced search query', async () => {
    const user = userEvent.setup();
    renderBrowseScreen();
    await waitFor(() => expect(screen.getByText('Transatlantic Classic')).toBeInTheDocument());

    await user.type(screen.getByPlaceholderText(/search routes/i), 'Pacific');

    await waitFor(() => {
      expect(screen.queryByText('Transatlantic Classic')).not.toBeInTheDocument();
      expect(screen.getByText('Pacific Haul')).toBeInTheDocument();
    });
  });
});
