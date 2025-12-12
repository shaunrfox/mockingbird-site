import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, ThemeSwitcher } from '@okshaun/components';
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
// import { BreakpointIndicator } from '@okshaun/components';
// import { HStack } from '@styled-system/jsx';

function App() {
  return (
    <BrowserRouter>
      <Box minH='100vh'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/team' element={<Team />} />
          <Route path='/pledge' element={<Pledge />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/newsletter/confirmed' element={<NewsletterConfirmed />} />
          <Route path='/newsletter/already-confirmed' element={<NewsletterAlreadyConfirmed />} />
          <Route path='/newsletter/error' element={<NewsletterError />} />
        </Routes>
        <Footer />
        {/* <HStack position='fixed' bottom='20' right='20'>
          <ThemeSwitcher />
          <BreakpointIndicator />
        </HStack> */}
      </Box>
    </BrowserRouter>
  );
}

export default App;
