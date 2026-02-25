import { useState } from 'react';
import AuthProvider from './context/AuthProvider';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import Dashboard from './components/dashboard/Dashboard';

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    <ToastContainer/>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
