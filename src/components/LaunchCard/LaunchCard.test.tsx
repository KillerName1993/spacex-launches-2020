import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { LaunchCard } from './LaunchCard';
import { LaunchProvider } from '../../context/LaunchContext';
import { Launch } from '../../types/launch';

const mockLaunch: Launch = {
   flight_number: 1,
   mission_name: 'Test Mission',
   mission_id: ['test123'],
   launch_year: '2020',
   launch_date_unix: 1600000000,
   launch_date_utc: '2020-01-01T00:00:00.000Z',
   launch_date_local: '2020-01-01T00:00:00-04:00',
   rocket: {
      rocket_id: 'falcon9',
      rocket_name: 'Falcon 9',
      rocket_type: 'FT',
   },
   links: {
      mission_patch: 'https://example.com/patch.png',
      mission_patch_small: 'https://example.com/patch_small.png',
      reddit_campaign: null,
      reddit_launch: null,
      reddit_recovery: null,
      reddit_media: null,
      presskit: null,
      article_link: null,
      wikipedia: null,
      video_link: null,
      youtube_id: null,
      flickr_images: [],
   },
   details: 'Test mission details',
};

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
   <MantineProvider>
      <LaunchProvider>
         {children}
      </LaunchProvider>
   </MantineProvider>
);

describe('LaunchCard', () => {
   it('renders mission information correctly', () => {
      render(
         <Wrapper>
            <LaunchCard launch={mockLaunch} />
         </Wrapper>
      );

      expect(screen.getByText('Test Mission')).toBeInTheDocument();
      expect(screen.getByText('Falcon 9')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'See more' })).toBeInTheDocument();
   });

   it('opens modal when "See more" button is clicked', () => {
      render(
         <Wrapper>
            <LaunchCard launch={mockLaunch} />
         </Wrapper>
      );

      const seeMoreButton = screen.getByRole('button', { name: 'See more' });
      fireEvent.click(seeMoreButton);
   });
});