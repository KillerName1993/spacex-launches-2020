import React, { useEffect } from 'react';
import { LoadingOverlay, Alert } from '@mantine/core';
import { useLaunch } from '../../context/LaunchContext';
import { LaunchCard } from '../LaunchCard/LaunchCard';

export const LaunchList: React.FC = () => {
   const { state, dispatch } = useLaunch();
   const { launches, loading, error } = state;

   useEffect(() => {
      const fetchLaunches = async () => {
         dispatch({ type: 'SET_LOADING', payload: true });
         try {
            const response = await fetch(
               'https://api.spacexdata.com/v3/launches?launch_year=2020'
            );

            if (!response.ok) {
               throw new Error('Failed to fetch launches');
            }

            const data = await response.json();
            dispatch({ type: 'SET_LAUNCHES', payload: data });
         } catch (err) {
            dispatch({
               type: 'SET_ERROR',
               payload: err instanceof Error ? err.message : 'An error occurred'
            });
         }
      };

      fetchLaunches();
   }, [dispatch]);

   if (error) {
      return (
         <Alert color="red" title="Error" variant="filled">
            {error}
         </Alert>
      );
   }

   return (
      <div style={{ position: 'relative' }}>
         <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />

         <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 200px)',
            gap: '16px',
            justifyContent: 'center',
            padding: '0 16px'
         }}>
            {launches.map((launch) => (
               <div key={launch.flight_number}>
                  <LaunchCard launch={launch} />
               </div>
            ))}
         </div>
      </div>
   );
};