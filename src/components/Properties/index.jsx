import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropertyCard from './PropertyCard';
import NewPropertyCard from './NewPropertyCard';

import useStyles from './Properties.styles';

const cards = [
  {
    pid: 1,
    title: 'property',
    description: 'A property',
    imageUrl: 'https://source.unsplash.com/random',
    imageTitle: 'imgTitle',
  },
  {
    pid: 2,
    title: 'property2',
    description: 'A property',
    imageUrl: 'https://source.unsplash.com/random',
    imageTitle: 'imgTitle',
  },
  {
    pid: 3,
    title: 'property3',
    description: 'A property',
    imageUrl: 'https://source.unsplash.com/random',
    imageTitle: 'imgTitle',
  },
  {
    pid: 4,
    title: 'property4',
    description: 'A property',
    imageUrl: 'https://source.unsplash.com/random',
    imageTitle: 'imgTitle',
  },
  {
    pid: 5,
    title: 'property5',
    description: 'A property',
    imageUrl: 'https://source.unsplash.com/random',
    imageTitle: 'imgTitle',
  },
  {
    pid: 6,
    title: 'property6',
    description: 'A property',
    imageUrl: 'https://source.unsplash.com/random',
    imageTitle: 'imgTitle',
  },
];

const Properties = () => {
  const classes = useStyles();
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
        {/* <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
          <NewPropertyCard />
        </Grid> */}
        {cards.map((item) => (
          <Grid item key={item.pid} xs={12} sm={6} md={4}>
            <PropertyCard
              action="EDIT"
              key={item.pid}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              imageTitle={item.imageTitle}
              pid={item.pid}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Properties;
