/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';
import PropertyItem from '../../src/components/Properties/PropertyItem';
import Layout from '../../src/components/Layout';
import APIClient from '../../services/backend.services';
import { useAuth } from '../../hooks/auth';
// eslint-disable-next-line react/prop-types
export default function Prop({ data, meetings }) {
  const { user } = useAuth();
  const router = useRouter();
  const { pid } = router.query;
  // console.log(`pid- ${pid} \nuserToken -${user.token}`);
  if (meetings) console.log(`data - ${JSON.stringify(meetings, null, 2)}`); // ;
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
            ? `${process.env.baseURL}/${property_images
                .slice(-1)[0]
                .cover.replace('http://localhost:8000/', '')}`
            : // ? JSON.stringify(item.property_images[0].cover)
              'https://ecowellness.com/wp-content/uploads/2017/04/property.jpg'
        }
        meetings={meetings}
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { data } = await APIClient.get(`/properties/${context.params.pid}`);
  const meetings = await APIClient.get(
    `/properties/${context.params.pid}/meetings/`
  );
  return { props: { data, meetings: meetings.data } };
}
