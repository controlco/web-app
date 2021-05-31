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
  console.log(`data - ${JSON.stringify(data, null, 2)}`); // ;
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
    property_images,
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
        imageUrl={
          property_images.slice(-1)[0]
            ? `http://desarrollosoftware.tk/${property_images
                .slice(-1)[0]
                .cover.replace('http://localhost:8000/', '')}`
            : // ? JSON.stringify(item.property_images[0].cover)
              'https://ecowellness.com/wp-content/uploads/2017/04/property.jpg'
        }
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { data } = await APIClient.get(`/properties/${context.params.pid}`);
  console.log('data server');
  return { props: { data } };
}
