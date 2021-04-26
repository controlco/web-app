import React from 'react';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import useStyles from './PropertyCard.styles';

const PropertyCard = (props) => {
  // eslint-disable-next-line react/prop-types
  const { title, description, imageUrl, imageTitle, pid } = props;
  const classes = useStyles();
  const router = useRouter();
  const handleViewClick = () => {
    router.push(`/property/${pid}`);
  };

  return (
    <div>
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
        <CardActions>
          <Button onClick={handleViewClick} size="small" color="primary">
            Ver
          </Button>
          <Button size="small" color="primary">
            Editar
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default PropertyCard;
