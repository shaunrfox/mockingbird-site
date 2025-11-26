import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, ThemeSwitcher } from '@okshaun/components';
import { Header } from './components/Header';
import Home from './pages/Home';
import Staff from './pages/Staff';
import Pledge from './pages/Pledge';
import Contact from './pages/Contact';
import './App.css';
import { BreakpointIndicator } from '@okshaun/components';
import { HStack } from '@styled-system/jsx';

function App() {
  return (
    <BrowserRouter>
      <Box minH='100vh'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/staff' element={<Staff />} />
          <Route path='/pledge' element={<Pledge />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <HStack position='fixed' bottom='20' right='20'>
          <ThemeSwitcher />
          <BreakpointIndicator />
        </HStack>
      </Box>
    </BrowserRouter>
  );
}

export default App;
