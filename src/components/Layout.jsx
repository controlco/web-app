import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './NavBar';
import { useAuth, AuthProvider } from '../../hooks/auth';
import theme from '../theme';

// eslint-disable-next-line react/prop-types
const Layout = () => {
  const { isAuthenticated } = useAuth();
  console.log(`auth in layout ${isAuthenticated}`);
  return <>{isAuthenticated && <NavBar />}</>;
};

export default Layout;
