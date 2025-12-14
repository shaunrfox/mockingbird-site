import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Box, BreakpointIndicator } from '@okshaun/components';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import Team from './pages/Team';
import Pledge from './pages/Pledge';
import Contact from './pages/Contact';
import {
  NewsletterConfirmed,
  NewsletterAlreadyConfirmed,
  NewsletterError,
} from './pages/newsletter';
import './App.css';

function MainLayout() {
  return (
    <Box minH='100vh'>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Newsletter pages - standalone, no header/footer */}
        <Route path='/newsletter/confirmed' element={<NewsletterConfirmed />} />
        <Route
          path='/newsletter/already-confirmed'
          element={<NewsletterAlreadyConfirmed />}
        />
        <Route path='/newsletter/error' element={<NewsletterError />} />

        {/* Main site with layout */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/team' element={<Team />} />
          <Route path='/pledge' element={<Pledge />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
