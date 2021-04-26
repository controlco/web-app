import React from "react";
import Head from "next/head";
import Image from "next/image";
import SignIn from "../src/components/SignIn/";

const Index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>CtrlCo | Propiedades</title>
      </Head>
      {/*<Image src="/vercel.svg" alt="me" width="64" height="64" />*/}
      <SignIn />
    </React.Fragment>
  );
};

export default Index;
