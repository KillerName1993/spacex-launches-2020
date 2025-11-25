import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { LaunchModal } from './LaunchModal';
import { LaunchProvider } from '../../context/LaunchContext';

describe('LaunchModal', () => {
   it('does not render modal content when closed', () => {
      render(
         <MantineProvider>
            <LaunchProvider>
               <LaunchModal />
            </LaunchProvider>
         </MantineProvider>
      );

      expect(screen.queryByText('Mission name:')).not.toBeInTheDocument();
   });
});