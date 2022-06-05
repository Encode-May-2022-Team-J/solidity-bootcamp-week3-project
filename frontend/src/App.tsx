import { AppShell, Container, MantineProvider, MantineThemeOverride } from '@mantine/core';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';

const links = [
  {
    link: '/',
    label: 'Explore'
  },
  {
    link: '/pricing',
    label: 'Create'
  }
];

const myTheme: MantineThemeOverride = {
  colorScheme: 'light',
  primaryColor: 'violet'
};

function App() {
  return (
    <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
      <AppShell padding="md" header={<Header links={links} />}>
        <Container>
          <Outlet />
        </Container>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
