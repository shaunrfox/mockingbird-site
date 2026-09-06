import { Outlet } from 'react-router';
import { Box } from '@okshaun/components';
import { Header } from '../../src/components/Header';
import { Footer } from '../../src/components/Footer';

export default function MainLayout() {
  return (
    <Box minH="[100vh]">
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
}
