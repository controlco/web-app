import React from 'react';
import ProfileForm from '../src/components/Profile/index';
import Layout from '../src/components/Layout';
import { useAuth } from '../hooks/auth';

const profileform = () => {
  const { user } = useAuth();

  return (
    <Layout>
      {user && (
        <ProfileForm
          imageUrl="https://source.unsplash.com/random"
          email={user.email}
          name={user.first_name}
          lastname={user.last_name}
          rut={user.rut}
          birthdate={user.birth_date}
          id={user.id}
          token={user.token}
        />
      )}
    </Layout>
  );
};

export default profileform;
