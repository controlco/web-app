import React from 'react';
import PropertyItem from '../../src/components/Properties/PropertyItem';
import Layout from '../../src/components/Layout';

const create = () => (
  <Layout>
    <PropertyItem
      action="CREATE"
      imageUrl="https://ecowellness.com/wp-content/uploads/2017/04/property.jpg"
    />
  </Layout>
);

export default create;
