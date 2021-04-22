import React from "react";
import SignInComponent from "../src/components/SignIn/";
import Image from "next/image";
import Head from "next/head";

const SignIn = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Inicia sesión</title>
      </Head>
      <Image src="/vercel.svg" alt="me" width="64" height="64" />
      <SignInComponent />
    </React.Fragment>
  );
};
export default SignIn;
