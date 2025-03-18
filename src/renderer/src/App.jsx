import React from "react";
import {  HashRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./pages/Login.jsx";
import EmailSender from "./pages/Emailsender.jsx";
import Logo from "./layouts/Logo.jsx";
import Developer from "./pages/Developer.jsx";
import './styles/dveloper.css';

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Logo/>
      <Routes location={location} key={location.pathname}>
       
        
        <Route
          path="/"
          element={<PageWrapper><Login /></PageWrapper>}
        />
        <Route
          path="/developer"
          element={<PageWrapper><Developer/></PageWrapper>}
        />
        <Route
          path="/email"
          element={<PageWrapper><EmailSender /></PageWrapper>}
        />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

const App = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
