import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './modules/Dashboard';
import Form from './modules/Form';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('user:token') !== null;

  if (!isLoggedIn) {
      return <Navigate to="/users/sign_in" />;
  } else if (isLoggedIn && ['/users/sign_in', '/users/sign_up'].includes(window.location.pathname)) {
      return <Navigate to="/" />;
  }
  return children;
};


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={
                  <ProtectedRoute>
                      <Dashboard />
                  </ProtectedRoute>
              } />
              <Route path="/users/sign_in" element={
                  <ProtectedRoute>
                      <Form isSignInPage={true} />
                  </ProtectedRoute>
              } />
              <Route path="/users/sign_up" element={
                  <ProtectedRoute>
                      <Form isSignInPage={false} />
                  </ProtectedRoute>
              } />
          </Routes>
      </Router>
  );
}

export default App;