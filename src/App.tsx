import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { LDContextProvider } from './context/LDContext';
import { UserProvider, useUser } from './context/UserContext';
import type { UserProfile } from './context/UserContext';
import { HeroSection } from './components/Hero/HeroSection';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Account } from './pages/Account';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Modal } from './components/common/Modal';
import { getRandomUserProfile } from './context/UserContext';

const MainContent = styled.main`
  flex: 1;
`;

const personas = [
  {
    label: 'Random',
    getProfile: () => getRandomUserProfile(),
  },
  {
    label: 'Dog Owner, US, Premium',
    getProfile: () => ({
      key: `dog-us-premium-${Math.random().toString(36).substring(2, 10)}`,
      anonymous: false,
      name: 'Alex Johnson',
      country: 'US',
      state: 'California',
      petType: 'dog',
      planType: 'premium',
      paymentType: 'credit_card',
    }),
  },
  {
    label: 'Cat Owner, UK, Basic',
    getProfile: () => ({
      key: `cat-uk-basic-${Math.random().toString(36).substring(2, 10)}`,
      anonymous: false,
      name: 'Sophie Smith',
      country: 'UK',
      state: 'Greater London',
      petType: 'cat',
      planType: 'basic',
      paymentType: 'paypal',
    }),
  },
];

function PersonaModal({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (profile: any) => void }) {
  const [selected, setSelected] = useState(0);
  const persona = personas[selected];
  const profile = persona.getProfile();

  return (
    <Modal open={open} onClose={onClose}>
      <h2>Select a Demo Persona</h2>
      <select
        value={selected}
        onChange={e => setSelected(Number(e.target.value))}
        style={{ width: '100%', padding: '0.5em', marginBottom: '1em' }}
      >
        {personas.map((p, i) => (
          <option value={i} key={p.label}>{p.label}</option>
        ))}
      </select>
      <div style={{ textAlign: 'left', marginBottom: '1em', fontSize: '0.95em', background: '#f8f8f8', borderRadius: 8, padding: '1em' }}>
        {Object.entries(profile).map(([k, v]) => (
          <div key={k}><strong>{k}:</strong> {String(v)}</div>
        ))}
      </div>
      <button style={{ width: '100%' }} onClick={() => onSelect(profile)}>Continue as {persona.label}</button>
    </Modal>
  );
}

function AppContent() {
  const { isLoggedIn, login, logout } = useUser();
  const navigate = useNavigate();
  const [showPersonaModal, setShowPersonaModal] = useState(false);

  const handlePersonaSelect = (profile: UserProfile) => {
    login(profile);
    setShowPersonaModal(false);
  };

  return (
    <LDContextProvider>
      <Header
        isLoggedIn={isLoggedIn}
        onLogin={() => setShowPersonaModal(true)}
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
      <PersonaModal 
        open={showPersonaModal} 
        onClose={() => setShowPersonaModal(false)}
        onSelect={handlePersonaSelect} 
      />
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
