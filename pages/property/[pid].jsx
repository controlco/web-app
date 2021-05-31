/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';
import PropertyItem from '../../src/components/Properties/PropertyItem';
import Layout from '../../src/components/Layout';
import APIClient from '../../services/backend.services';
import { useAuth } from '../../hooks/auth';
// eslint-disable-next-line react/prop-types
export default function Prop({ data }) {
  const { user } = useAuth();
  const router = useRouter();
  const { pid } = router.query;
  // console.log(`pid- ${pid} \nuserToken -${user.token}`);
  // console.log(`data - ${JSON.stringify(data)}`)// ;
  const {
    title,
    adress,
    description,
    price,
    latitude,
    longitude,
    district_name,
    electricity_service,
    water_service,
  } = data;
  return (
    <Layout>
      <PropertyItem
        action="EDIT"
        title={title}
        description={description}
        address={adress}
        price={price}
        latitude={latitude}
        longitude={longitude}
        districtName={district_name}
        electricityService={electricity_service}
        waterService={water_service}
        pid={pid}
        imageUrl="https://source.unsplash.com/random"
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { data } = await APIClient.get(`/properties/${context.params.pid}`);
  console.log('data server');
  return { props: { data } };
}
