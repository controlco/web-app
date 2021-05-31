/* eslint-disable react/prop-types */
import React from 'react';
import { Container, TextField, Grid, Button } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Image from 'next/image';

import { useFormik } from 'formik';

import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import useStyles from './Profile.styles';

import APIClient from '../../../services/backend.services';

const Profile = (props) => {
  // console.log(`props in profile ${JSON.stringify(props)}`);
  const maxDate = new Date();
  const currentDate = new Date();
  maxDate.setFullYear(currentDate.getFullYear() - 18);

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState('error');
  const [alertText, setAlertText] = React.useState('');

  const { imageUrl, email, name, lastname, rut, birthdate, id, token } = props;
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      imageUrl,
      email,
      name,
      lastname,
      rut,
      birthdate,
      // eslint-disable-next-line no-undef
      // file: null,
    },
    onSubmit: async (values) => {
      // eslint-disable-next-line no-alert
      // eslint-disable-next-line no-undef
      const payload = {
        email: values.email,
        first_name: values.name,
        last_name: values.lastName,
        birth_date: values.birthdate,
        rut: values.rut,
      };
      await APIClient.patch(`/users/${id}/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          // console.log('actualizado con exito');

          setAlertText('Perfil actualizado con éxito.');
          setAlertSeverity('success');
          setAlertOpen(true);
        })

        .catch((err) => {
          setAlertSeverity('error');
          setAlertText('Ocurrió un error. Intenta nuevamente.');
          setAlertOpen(true);
          // console.log(err);
        });

      // alert(JSON.stringify(values.file, null, 2));
    },
  });

  React.useEffect(() => {}, [formik.values.birthdate]);
  return (
    <Container className={classes.container} maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography
          align="center"
          component="h1"
          variant="h5"
          className={classes.title}
        >
          Editar Perfil
        </Typography>
        <Collapse in={alertOpen}>
          <Alert
            severity={alertSeverity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {alertText}
          </Alert>
        </Collapse>
        <form onSubmit={formik.handleSubmit}>
          <Grid container justify="space-between">
            {/* 
            <Grid
              item
              container
              xs={5}
              justify="center"
              className={classes.addPadding}
            >
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
                <div className={classes.centerLabel}>
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    className={classes.input}
                    type="file"
                    onChange={(event) => {
                      formik.setFieldValue(
                        'file',
                        event.currentTarget.files[0]
                      );
                      console.log(
                        'eveeeeent upload',
                        event.currentTarget.files[0]
                      );
                      console.log(
                        'eveeeeent upload2',
                        event.currentTarget.files
                      );
                    }}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      style={{ margin: 'auto 0' }}
                      color="primary"
                      component="span"
                    >
                      Cargar imagen
                    </Button>
                  </label>
                </div>
              </Grid>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="URL de imagen"
                  name="imageUrl"
                  value={formik.values.imageUrl}
                  onChange={formik.handleChange}

                />
            </Grid>
            */}
            <Grid item container xs={12}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
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
                    value={formik.values.birthdate}
                    disableFuture
                    maxDate={maxDate}
                    onChange={(date) => formik.setFieldValue('birthdate', date)}
                  />
                </MuiPickersUtilsProvider>
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
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Profile;
