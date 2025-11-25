import { MantineProvider, Container, Title } from '@mantine/core';
import { LaunchProvider } from './context/LaunchContext';
import { LaunchList } from './components/LaunchList/LaunchList';
import { LaunchModal } from './components/LaunchModal/LaunchModal';

function App() {
  return (
    <MantineProvider>
      <LaunchProvider>
        <Container size="lg" py="xl">
          <Title order={1} ta="center" mb="lg">
            SpaceX Launches 2020
          </Title>
          <LaunchList />
          <LaunchModal />
        </Container>
      </LaunchProvider>
    </MantineProvider>
  );
}

export default App;