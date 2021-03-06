import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import APIClient from '../services/backend.services';

const fetchToken = (email, password) => {
  // console.log('fetching token');
  return APIClient.post('/login', { email, password });
};

const fetchUser = async (id) => {
  // console.log('fetching user');
  const url = `/users/${id}/`;
  const headers = {
    'Content-Type': 'application/json',
  };
  return APIClient.get(url, { headers });
};

const AuthContext = React.createContext({
  isAuthenticated: false,
  loading: true,
  user: null,
  login: () => {},
  logout: () => {},
});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const [accessTokenExpiry, setAccessTokenExpiry] = useState(null);

  const setNotAuthenticated = () => {
    setIsAuthenticated(false);
    setLoading(false);
    setUser(null);
  };

  const accessTokenIsValid = () => {
    if (accessToken === '') {
      return false;
    }
    const expiry = new Date(accessTokenExpiry);
    // console.log('Checking token expiry:', expiry);
    return expiry.getTime() > Date.now();
  };

  const logout = () => {
    setAccessToken('');
    setAccessTokenExpiry(null);
    setNotAuthenticated();
  };

  const initAuth = async () => {
    setLoading(true);
    if (!accessTokenIsValid()) {
      logout();
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (!isAuthenticated) {
      router.push('/');
    }
    setLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    initAuth();
  }, []);

  const initUser = async (id, token) => {
    const resp = await fetchUser(id);
    // console.log(JSON.stringify(resp));
    // eslint-disable-next-line camelcase
    const { email, first_name, last_name, rut, birth_date } = await resp.data;
    setUser({
      email,
      id,
      token,
      first_name,
      last_name,
      rut,
      birth_date,
    });
    // console.log(`useeer - ${JSON.stringify(user, null, 2)}`);
  };

  const handleNewToken = (token) => {
    setAccessToken(token);
    const expiryInt = token.exp * 1000;
    setAccessTokenExpiry(expiryInt);
    setIsAuthenticated(true);
    setLoading(false);
  };

  const login = async (email, password) => {
    const resp = await fetchToken(email, password);
    // console.log(`responseee ${JSON.stringify(resp, null, 4)}`);
    /* console.log(
      `token ${JSON.stringify(jwt_decode(resp.data.token), null, 4)}`
    );
    */

    if (resp.data.success) {
      const decodedToken = jwt_decode(resp.data.token);
      // console.log('sucessss');
      handleNewToken(decodedToken);
      await initUser(decodedToken.user_id, resp.data.token);
    } else {
      setIsAuthenticated(false);
      setLoading(true);
      // Let the page handle the error
    }
    return resp;
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
