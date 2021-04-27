import React from 'react';

import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import useStyles from './PropertyCard.styles';

const PropertyCard = (props) => {
  // eslint-disable-next-line react/prop-types
  const { action, title, description, imageUrl, imageTitle, pid } = props;
  const classes = useStyles();
  const router = useRouter();
  const handleViewClick = () => {
    switch (action) {
      case 'CREATE':
        router.push('/property/create');
        break;
      case 'EDIT':
        router.push(`/property/${pid}`);
        break;
      default:
        router.push('404');
    }
  };

  return (
    <div
      className={classes.cardContainer}
      onClick={() => {
        handleViewClick();
      }}
      aria-hidden="true"
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={imageUrl}
          title={imageTitle}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography>{description}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyCard;
