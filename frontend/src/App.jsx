

import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


//components imports
import Dashboard from './pages/Dashboard';
import Login from "./components/Login";
import Signup from './components/Signup';

//useAuthStore imports
import useAuthStore from './store/useAuthStore.js';

const App = () => {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthChecking = useAuthStore((state) => state.isAuthChecking);
  const checkingAuth = useAuthStore((state) => state.checkingAuth);
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const isloggedOut = useAuthStore((state) => state.isloggedOut);

  useEffect(() => {
    checkingAuth();
  }, [isloggedOut, loggedIn]);

  if(isAuthChecking && !isAuthenticated) {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <span className="loading loading-spinner loading-md"></span>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path='/' element={ isAuthenticated?.user ? <Dashboard /> : <Navigate to={'/login'} />} />
        <Route path='/login' element={ !isAuthenticated?.user ? <Login /> : <Navigate to={'/'} /> } />
        <Route path='/signup' element={ !isAuthenticated?.user ? <Signup /> : <Navigate to={'/'} /> } />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
