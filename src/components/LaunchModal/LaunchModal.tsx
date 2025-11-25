import React from 'react';
import { createPortal } from 'react-dom';
import { Text, CloseButton, Stack } from '@mantine/core';
import { useLaunch } from '../../context/LaunchContext';

export const LaunchModal: React.FC = () => {
   const { state, dispatch } = useLaunch();
   const { selectedLaunch, isModalOpen } = state;

   const handleClose = () => {
      dispatch({ type: 'CLOSE_MODAL' });
   };

   if (!isModalOpen || !selectedLaunch) return null;

   const imageUrl = selectedLaunch.links.mission_patch_small || selectedLaunch.links.mission_patch;

   const modalContent = (
      <div
         style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            zIndex: 1000,
            paddingTop: '20px',
         }}
         onClick={handleClose}
      >
         <div
            style={{
               backgroundColor: 'white',
               padding: '0.5rem 0 0 0.5rem',
               borderRadius: '8px',
               width: '570px',
               height: '440px',
               display: 'flex',
               flexDirection: 'column',
               position: 'relative',
               overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
         >
            <CloseButton
               style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', zIndex: 10 }}
               onClick={handleClose}
            />

            <Text fw={600} size="sm" style={{ margin: '0.3rem 0 1rem 0.3rem' }}>
               {selectedLaunch.mission_name}
            </Text>

            <div className="modal-scrollbar" style={{
               flex: 1,
               overflowY: 'auto',
               padding: '0',
               margin: '0',
            }}>
               <Stack gap={0} style={{ paddingRight: '2rem' }}>
                  <div style={{
                     display: 'flex',
                     justifyContent: 'center',
                     width: '100%',
                     marginBottom: '5px',
                  }}>
                     {imageUrl ? (
                        <div style={{
                           height: 160,
                           width: 160,
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center',
                           backgroundColor: '#f8f9fa',
                           borderRadius: '8px',
                           padding: '0.5rem'
                        }}>
                           <img
                              src={imageUrl}
                              alt={selectedLaunch.mission_name}
                              style={{
                                 maxHeight: '100%',
                                 maxWidth: '100%',
                                 objectFit: 'contain'
                              }}
                           />
                        </div>
                     ) : (
                        <div style={{
                           height: 160,
                           width: 160,
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           backgroundColor: '#f5f5f5',
                           borderRadius: '8px',
                        }}>
                           <Text c="dimmed">No image</Text>
                        </div>
                     )}
                  </div>

                  <div style={{ textAlign: 'left', width: '100%' }}>
                     <Text size="sm" fw={600} style={{ marginBottom: '0.1rem' }}>
                        Mission name:
                     </Text>
                     <Text size="sm" c="dimmed" style={{ marginBottom: '0.7rem' }}>
                        {selectedLaunch.mission_name}
                     </Text>

                     <Text size="sm" fw={600} style={{ marginBottom: '0.1rem' }}>
                        Rocket name:
                     </Text>
                     <Text size="sm" c="dimmed" style={{ marginBottom: '0.7rem' }}>
                        {selectedLaunch.rocket.rocket_name}
                     </Text>

                     <Text size="sm" fw={600} style={{ marginBottom: '0.1rem' }}>
                        Details:
                     </Text>
                     {selectedLaunch.details ? (
                        <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                           {selectedLaunch.details}
                        </Text>
                     ) : (
                        <Text size="sm" c="dimmed">
                           No details available for this mission.
                        </Text>
                     )}
                  </div>
               </Stack>
            </div>
         </div>
      </div>
   );

   return createPortal(modalContent, document.body);
};