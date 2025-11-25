import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { LaunchList } from './LaunchList';
import { LaunchProvider } from '../../context/LaunchContext';

vi.mock('../../context/LaunchContext', () => ({
   useLaunch: vi.fn(),
   LaunchProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

import { useLaunch } from '../../context/LaunchContext';

const mockUseLaunch = vi.mocked(useLaunch);

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
   <MantineProvider>
      <LaunchProvider>
         {children}
      </LaunchProvider>
   </MantineProvider>
);

describe('LaunchList', () => {
   it('renders loading state', () => {
      mockUseLaunch.mockReturnValue({
         state: {
            launches: [],
            loading: true,
            error: null,
            selectedLaunch: null,
            isModalOpen: false
         },
         dispatch: vi.fn()
      });

      render(<Wrapper><LaunchList /></Wrapper>);

      expect(document.querySelector('.mantine-LoadingOverlay-root')).toBeInTheDocument();
   });
});