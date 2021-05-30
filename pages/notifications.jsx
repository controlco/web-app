import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from '../src/components/Loading';

const notifications = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/404');
  });
  return <Loading />;
  /* return (
      <div>
        agregar si quiere recibir en app o emaiagregar si quiere recibir en app
        o emaill
      </div>
  ); */
};

export default notifications;
