/* eslint-disable react/prop-types */
import React from 'react';
import { Container, TextField, Grid, Button } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Image from 'next/image';

import { useFormik } from 'formik';

import useStyles from './Profile.styles';

const Profile = (props) => {
  const { imageUrl, email, name, lastname, rut, birthday } = props;
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      imageUrl,
      email,
      name,
      lastname,
      rut,
      birthday,
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
        <Grid container justify="space-between">
          <Grid item container xs={12}>
            <h1 className={classes.title}>Editar Perfil</h1>
          </Grid>
          <Grid item container xs={5} className={classes.addPadding}>
            <Grid item xs={12}>
              <Image
                src={imageUrl}
                alt="me"
                width="fullWidth"
                height="fullHeight"
              />
            </Grid>
            <Grid item xs={12}>
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
                label="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Nombre"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Apellido"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Rut"
                name="rut"
                value={formik.values.rut}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} className={classes.addMargin}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  fullWidth
                  id="date-picker-dialog"
                  label="Fecha de nacimiento (dd/mm/aaaa)"
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  clearable
                  value={formik.values.birthday}
                  disableFuture
                  onChange={(date) => formik.setFieldValue('birthday', date)}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              className={classes.addMargin}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Profile;
