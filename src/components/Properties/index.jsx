import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropertyCard from './PropertyCard';
import NewPropertyCard from './NewPropertyCard';

import useStyles from './Properties.styles';
import { useAuth } from '../../../hooks/auth';
import APIClient from '../../../services/backend.services';

const Properties = () => {
  const classes = useStyles();
  const { user } = useAuth();
  console.log(`user ${JSON.stringify(user)}`);

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    APIClient.get(`/users/${user.id}/properties/`).then((res) => {
      console.log(`res properties ${JSON.stringify(res)}`);
      setData(res.data);
    });
  }, []);
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      {/* End hero unit */}
      <Typography
        align="center"
        component="h1"
        variant="h4"
        className={classes.title}
      >
        Mis propiedades
      </Typography>
      <NewPropertyCard />
      <Grid container spacing={4}>
        {data &&
          data.map((item) => (
            <Grid item key={item.pid} xs={12} sm={6} md={4}>
              <PropertyCard
                action="EDIT"
                key={item.pid}
                title={item.title}
                description={item.description}
                imageUrl={
                  // item.property_images
                  // ? JSON.stringify(item.property_images[0].cover)
                  'https://ecowellness.com/wp-content/uploads/2017/04/property.jpg'
                }
                pid={item.id}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Properties;
