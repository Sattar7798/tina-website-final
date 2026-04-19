import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import Research from './pages/Research';
import Portfolio from './pages/Portfolio';
import PublicationsPage from './pages/PublicationsPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Design from './pages/Design';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Utilities
import './index.css';

const AnimationLayout = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname}>
        {children}
      </div>
    </AnimatePresence>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading resources
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-animation">
          <div className="loading-layer layer-1"></div>
          <div className="loading-layer layer-2"></div>
          <div className="loading-layer layer-3"></div>
          <div className="loading-layer layer-4"></div>
        </div>
        <div className="loading-text">Building Architectural Layers</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <AnimationLayout>
                <Home />
              </AnimationLayout>
            } />
            <Route path="/research" element={
              <AnimationLayout>
                <Research />
              </AnimationLayout>
            } />
            <Route path="/portfolio" element={
              <AnimationLayout>
                <Portfolio />
              </AnimationLayout>
            } />
            <Route path="/publications" element={
              <AnimationLayout>
                <PublicationsPage />
              </AnimationLayout>
            } />
            <Route path="/about" element={
              <AnimationLayout>
                <About />
              </AnimationLayout>
            } />
            <Route path="/contact" element={
              <AnimationLayout>
                <Contact />
              </AnimationLayout>
            } />
            <Route path="/design" element={
              <AnimationLayout>
                <Design />
              </AnimationLayout>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;