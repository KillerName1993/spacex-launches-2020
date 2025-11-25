import React from 'react';
import { Card, Text, Button } from '@mantine/core';
import { Launch } from '../../types/launch';
import { useLaunch } from '../../context/LaunchContext';

interface LaunchCardProps {
   launch: Launch;
}

export const LaunchCard: React.FC<LaunchCardProps> = ({ launch }) => {
   const { dispatch } = useLaunch();

   const handleSeeMore = () => {
      dispatch({ type: 'SELECT_LAUNCH', payload: launch });
      dispatch({ type: 'OPEN_MODAL' });
   };

   const imageUrl = launch.links.mission_patch_small;

   return (
      <Card shadow="sm" padding="md" radius="md" withBorder style={{ width: '200px', margin: '0 auto' }}>
         <Card.Section>
            {imageUrl ? (
               <div style={{
                  height: 120,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0.7rem',
                  backgroundColor: '#f8f9fa'
               }}>
                  <img
                     src={imageUrl}
                     alt={launch.mission_name}
                     style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain'
                     }}
                  />
               </div>
            ) : (
               <div style={{
                  height: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5',
               }}>
                  <Text c="dimmed">No image available</Text>
               </div>
            )}
         </Card.Section>

         <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <Text
               fw={500}
               size="sm"
               style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  lineHeight: '1.2',
                  marginBottom: '5px'
               }}
            >
               {launch.mission_name}
            </Text>

            <Text
               size="xs"
               c="dimmed"
               style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  marginBottom: '10px'
               }}
            >
               {launch.rocket.rocket_name}
            </Text>
         </div>

         <Button
            color="blue"
            fullWidth
            radius="md"
            size="xs"
            onClick={handleSeeMore}
         >
            See more
         </Button>
      </Card>
   );
};