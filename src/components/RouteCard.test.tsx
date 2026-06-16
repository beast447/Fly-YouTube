import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import RouteCard from './RouteCard.tsx';
import type { Route } from '../types/index.ts';

const route: Route = {
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
};

describe('RouteCard', () => {
  it('renders route details and is keyboard-activatable', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<RouteCard route={route} onClick={onClick} />);

    expect(screen.getByText('Transatlantic Classic')).toBeInTheDocument();
    expect(screen.getByText(/EGLL/)).toBeInTheDocument();
    expect(screen.getByText('847')).toBeInTheDocument();

    const button = screen.getByRole('button');
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);

    button.focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
