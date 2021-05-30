import React from 'react';
import { useRouter } from 'next/router';
import PropertyItem from '../../src/components/Properties/PropertyItem';
import Layout from '../../src/components/Layout';

const Prop1 = () => {
  const router = useRouter();
  const { pid } = router.query;
  console.log(`pid- ${pid}`);
  return (
    <Layout>
      <PropertyItem
        action="EDIage`, `src` or `component` prop must be T"
        title="Casa gigante"
        description="una casa en el lago"
        address="Calle 1, Santiago"
        imageUrl="https://source.unsplash.com/random"
      />
    </Layout>
  );
};

export default Prop1;
