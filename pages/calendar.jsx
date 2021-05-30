import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from '../src/components/Loading';

const calendar = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/404');
  });
  return <Loading />;
  // return <div>añadir calendario</div>;
};

export default calendar;
