import React from 'react';
import NavBar from './NavBar';
import { useAuth } from '../../hooks/auth';
import Loading from './Loading';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  /* console.log(`auth in layout ${isAuthenticated}`);
  console.log(`isLoading in layout${loading}`);
  console.log(`user in layout${JSON.stringify(user)}`); */
  if (isAuthenticated) {
    return (
      <>
        <NavBar />
        {children}
      </>
    );
  }
  return <Loading />;
};

export default Layout;
