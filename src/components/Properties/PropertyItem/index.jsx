/* eslint-disable react/prop-types */
import React from 'react';
import { Container, TextField, Grid, Button } from '@material-ui/core';
import Image from 'next/image';

import { useFormik } from 'formik';

const PropertyItem = (props) => {
  const {
    title,
    description,
    address,
    phoneNumber,
    imageUrl,
    dimension,
  } = props;
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
    <Container maxWidth="md">
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item container xs={12} md={6}>
            <Image src={imageUrl} alt="me" width="auto" height="400px" />
          </Grid>
          <Grid item container xs={12} md={6}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Título"
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
                name="dimension"
                value={formik.values.dimension}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              {/* TODO: Implementar el subir imagenes y enviar a la API */}
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

            <Button color="primary" variant="contained" fullWidth type="submit">
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PropertyItem;
