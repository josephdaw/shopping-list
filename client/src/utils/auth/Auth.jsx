import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { decodeToken, 
  getTokenFromLocalStorage, 
  isTokenValid, 
  removeTokenFromLocalStorage, 
  saveTokenToLocalStorage,
AuthContext,
useAuthContext } from './authHelpers';
import PropTypes from 'prop-types';

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(getTokenFromLocalStorage() || null);
  const [loggedIn, setLoggedIn] = useState(!!getTokenFromLocalStorage())
  const [userData, setUserData] = useState(decodeToken(getTokenFromLocalStorage()) || {});

  useEffect(() => {
      if (token && isTokenValid(token)) {
          setLoggedIn(true);
          setUserData(decodeToken(token));
          saveTokenToLocalStorage(token);
      } else {
          setToken(null);
          setUserData({});
          setLoggedIn(false);
          removeTokenFromLocalStorage();
      }
  }, [token, setLoggedIn, setUserData, setToken]);

  const login = (token) => {
      setToken(token);
  };

  const logout = () => {
      setLoggedIn(false);
      setUserData({});
      setToken(null);
      removeTokenFromLocalStorage();
  };

  const getToken = () => {
      if (token && isTokenValid(token)) {
          return token;
      } else {
          logout();
          return null;
      }
  };

  return (
      <AuthContext.Provider value={{ loggedIn, login, logout, userData, getToken }}>
          {children}
      </AuthContext.Provider>
  );
};

export const ProtectedRoute = ({children}) => {
  const {loggedIn} = useAuthContext();
  const location = useLocation();

  if (!loggedIn) {
      return <Navigate to={"/login"} state={{from: location}} />
  }

  return children;
} 

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};