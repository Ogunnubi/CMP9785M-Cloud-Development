import './App.css'
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from "./Components/Home"
import Indeed from './Components/Indeed/Indeed';
// import Credits from './Components/Credits/Credits';
import Jobs from './Components/Jobs/Jobs';
import PersistLogin from './Components/PersistLogin';
import Layout from './Layout/Layout';
import { ToastContainer } from 'react-toastify';

import $ from 'jquery';
window.$ = window.jQuery = $;

// Protected route component
const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("authToken");

  const location = useLocation();

  const { currentUser } = useAuth();
  
  if (!currentUser || !token ) {
    return <Navigate to="/" from={{location}} replace  />;
  }
  
  return children;
};

function App() {



  return (
    <>


    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 9999 }}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
    
      <AuthProvider>
        <Layout>
          <PersistLogin>
            <Routes>


              <Route path="/" element={<Home />} />
              <Route 
                path="/jobs"
                element={
                  <ProtectedRoute>
                    <Indeed />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/submit" 
                element={
                  <ProtectedRoute>
                    <Jobs />
                  </ProtectedRoute>
                } 
              />


            </Routes>
          </PersistLogin>
        </Layout>
      </AuthProvider>
    </>
  )
}

export default App
