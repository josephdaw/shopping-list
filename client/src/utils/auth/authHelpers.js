import { jwtDecode } from 'jwt-decode';
import { createContext, useContext } from "react";

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("id_token");
}

export const saveTokenToLocalStorage = (token) => {
  localStorage.setItem("id_token", token);
}

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("id_token");
}

export const isTokenExpired = (decodedToken) => decodedToken.exp < Date.now() / 1000;

export const isTokenValid = (token) => {
  if (!token) return false;
  try {
      const decodedToken = jwtDecode(token);

      if (isTokenExpired(decodedToken)) return false;

      return true;

  } catch (error) {
      //Token is not valid
      return false;
  }
}

export const decodeToken = (token) => {
  try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
  } catch (error) {
      return {}
  }
}

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

