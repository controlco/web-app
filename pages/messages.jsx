import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from '../src/components/Loading';

const messages = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/404');
  });
  return <Loading />;
  // return <div>agregar mensajes de entrada</div>;
};

export default messages;
