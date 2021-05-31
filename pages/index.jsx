import React from 'react';
import Head from 'next/head';
import { useAuth } from '../hooks/auth';
// eslint-disable-next-line no-unused-vars
import SignIn from '../src/components/SignIn';
// import APIClient from '../services/backend.services';

const Index = () => {
  const { isAuthenticated } = useAuth();
  // APIClient.get('/users').then((res) => console.log(res));
  // console.log(`isauth in index ${isAuthenticated}`);
  return (
    <>
      <Head>
        <title>CtrlCo | Propiedades</title>
      </Head>
      {/* <Image src="/vercel.svg" alt="me" width="64" height="64" /> */}
      <SignIn />
    </>
  );
};

export default Index;
