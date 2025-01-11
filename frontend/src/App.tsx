import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { Dashboard } from '@/pages/Dashboard';
import { Home } from '@/pages/Home';
import { Impact } from '@/pages/Impact';
import { Swap } from '@/pages/Swap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

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