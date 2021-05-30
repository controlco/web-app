import React from 'react';
import PropertyItem from '../../src/components/Properties/PropertyItem';
import Layout from '../../src/components/Layout';

const create = () => (
  <Layout>
    <PropertyItem
      action="CREATE"
      imageUrl="https://source.unsplash.com/random"
    />
  </Layout>
);

export default create;
