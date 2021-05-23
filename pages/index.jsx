import React, { useEffect } from 'react';
import Head from 'next/head';
// eslint-disable-next-line no-unused-vars
import SignIn from '../src/components/SignIn';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/auth';
import Layout from '../src/components/Layout';

const Index = () => {
  // const { user, loading, loggedOut } = useUser();
  const { isAuthenticated, logout, login } = useAuth();
  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);
  return (
    <>
      <Head>
        <title>CtrlCo | Propiedades</title>
      </Head>
      {/* <Image src="/vercel.svg" alt="me" width="64" height="64" /> */}
      <Layout />
      <SignIn />
    </>
  );
};

export default Index;
