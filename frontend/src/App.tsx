import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Swap } from './pages/Swap';
import { Impact } from './pages/Impact';
import { Footer } from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/impact" element={<Impact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;