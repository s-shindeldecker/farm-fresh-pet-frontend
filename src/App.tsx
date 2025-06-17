import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { LDContextProvider } from './context/LDContext';
import { UserProvider, useUser } from './context/UserContext';
import { HeroSection } from './components/Hero/HeroSection';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Account } from './pages/Account';
import styled from '@emotion/styled';
import React from 'react';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

function AppContent() {
  const { isLoggedIn, login, logout } = useUser();
  const navigate = useNavigate();
  return (
    <LDContextProvider>
      <Header
        isLoggedIn={isLoggedIn}
        onLogin={login}
        onLogout={logout}
        onAccount={() => navigate('/account')}
      />
      <MainContent>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </MainContent>
      <Footer />
    </LDContextProvider>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;
