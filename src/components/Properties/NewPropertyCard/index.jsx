import React from 'react';

import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

import { useRouter } from 'next/router';
import useStyles from './NewPropertyCard.styles';

const NewProperty = () => {
  // eslint-disable-next-line react/prop-types
  const classes = useStyles();
  const router = useRouter();
  const handleViewClick = () => {
    router.push('/property/create');
  };

  return (
    <div
      className={classes.cardContainer}
      onClick={() => {
        handleViewClick();
      }}
      aria-hidden="true"
      style={{ display: 'flex' }}
    >
      <Card
        className={classes.newPropertyCard}
        style={{ margin: 'auto', display: 'flex' }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/06/OOjs_UI_icon_add.svg"
          alt="create property"
          width="50px"
          height="50px"
          margin="auto"
          style={{ margin: 'auto' }}
        />
      </Card>
    </div>
  );
};

export default NewProperty;
