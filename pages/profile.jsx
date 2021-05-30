import React from 'react';
import ProfileForm from '../src/components/Profile/index';
import Layout from '../src/components/Layout';

const profileform = () => (
  <Layout>
    <ProfileForm imageUrl="https://source.unsplash.com/random" />
  </Layout>
);

export default profileform;
