/* eslint-disable react/prop-types */
import React from 'react';
import { Container, TextField, Grid, Button } from '@material-ui/core';
import Image from 'next/image';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { useFormik } from 'formik';
import useStyles from './PropertyItem.styles';

const PropertyItem = (props) => {
  const {
    action,
    title,
    description,
    address,
    phoneNumber,
    imageUrl,
    dimension,
  } = props;
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      title,
      description,
      address,
      phoneNumber,
      imageUrl,
      dimension,
    },
    onSubmit: (values) => {
      // eslint-disable-next-line no-alert
      // eslint-disable-next-line no-undef
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Container className={classes.container} maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography
          align="center"
          component="h1"
          variant="h5"
          className={classes.title}
        >
          Propiedad
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container justify="space-between">
            <Grid item container xs={5} className={classes.addPadding}>
              <Grid item xs={12} style={{ display: 'flex' }}>
                <div
                  style={{
                    margin: '0 auto',
                    height: '318px',
                    width: 'fullWidth',
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt="me"
                    width="fullWidth"
                    height="318px"
                    className={classes.imageBorder}
                  />
                </div>
              </Grid>
              <Grid item xs={12} className={classes.addMargin}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="URL de magen"
                  name="imageUrl"
                  value={formik.values.imageUrl}
                  onChange={formik.handleChange}
                />
              </Grid>
              {/* TODO: Implementar el subir imagenes y enviar a la API */}
            </Grid>
            <Grid item container xs={6}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="titulo"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Descripción"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Dirección"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Número de teléfono"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Dimensión"
                  name="dimensión"
                  value={formik.values.dimension}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                className={classes.addMargin}
              >
                {action === 'CREATE' ? 'CREAR' : 'GUARDAR'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PropertyItem;
