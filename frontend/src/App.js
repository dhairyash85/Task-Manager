import React from 'react';
import './App.css';
import Header from './Components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Pages/Signin';
import { Home } from './Pages/Home';
import { Signup } from './Pages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <div
    style={{
      minHeight: '100vh',
      backgroundColor: '#6B7280',
      backgroundImage: 'url("https://www.transparenttextures.com/patterns/diagmonds-light.png")'
    }}
  >
    <ToastContainer position="top-right" theme="dark" />
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </div>
    
  );
}

export default App;
