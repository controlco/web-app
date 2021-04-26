import React from 'react';
import Head from 'next/head';
// eslint-disable-next-line no-unused-vars
import Image from 'next/image';
import SignIn from '../src/components/SignIn';

const Index = () => (
  <>
    <Head>
      <title>CtrlCo | Propiedades</title>
    </Head>
    {/* <Image src="/vercel.svg" alt="me" width="64" height="64" /> */}
    <SignIn />
  </>
);

export default Index;
