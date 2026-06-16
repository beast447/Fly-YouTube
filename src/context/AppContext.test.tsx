import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppProvider } from './AppContext.tsx';
import { useApp } from './useApp.ts';

function Consumer() {
  const { followedIds, loadedIds, toggleFollow, toggleLoaded } = useApp();
  return (
    <div>
      <span data-testid="followed">{Array.from(followedIds).join(',')}</span>
      <span data-testid="loaded">{Array.from(loadedIds).join(',')}</span>
      <button onClick={() => toggleFollow(3)}>toggle-follow-3</button>
      <button onClick={() => toggleLoaded(5)}>toggle-loaded-5</button>
    </div>
  );
}

describe('AppContext', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('seeds followedIds from creators marked as following', () => {
    render(
      <AppProvider>
        <Consumer />
      </AppProvider>
    );
    expect(screen.getByTestId('followed').textContent).toBe('1,2');
    expect(screen.getByTestId('loaded').textContent).toBe('');
  });

  it('toggles follow and loaded state', async () => {
    const user = userEvent.setup();
    render(
      <AppProvider>
        <Consumer />
      </AppProvider>
    );

    await user.click(screen.getByText('toggle-follow-3'));
    expect(screen.getByTestId('followed').textContent).toBe('1,2,3');

    await user.click(screen.getByText('toggle-loaded-5'));
    expect(screen.getByTestId('loaded').textContent).toBe('5');
  });
});
