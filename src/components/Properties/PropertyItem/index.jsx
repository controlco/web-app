/* eslint-disable react/prop-types */
import React from 'react';
import { Container, TextField, Grid, Button } from '@material-ui/core';
import Image from 'next/image';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { useFormik } from 'formik';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import useStyles from './PropertyItem.styles';
import APIClient from '../../../../services/backend.services';
import { useAuth } from '../../../../hooks/auth';

import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import { useRouter } from 'next/router';

const PropertyItem = (props) => {
  const {
    action,
    title,
    description,
    address,
    price,
    latitude,
    longitude,
    districtName,
    electricityService,
    waterService,
    imageUrl,
    pid,
  } = props;
  const router = useRouter();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState('error');
  const [alertText, setAlertText] = React.useState('');
  const { user } = useAuth();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      title,
      description,
      address,
      price,
      latitude,
      longitude,
      districtName,
      electricityService,
      waterService,
      imageUrl,
    },
    onSubmit: async (values, { resetForm }) => {
      // eslint-disable-next-line no-alert
      // eslint-disable-next-line no-undef
      const payload = {
        title: values.title,
        description: values.description,
        adress: values.address,
        price: values.price,
        latitude: values.latitude,
        longitude: values.longitude,
        district_name: values.districtName,
        district: 2,
        electricity_service:
          values.electricityService === true ? 'True' : 'False',
        water_service: values.waterService === true ? 'True' : 'False',
      };
      switch (action) {
        case 'CREATE':
          await APIClient.post(`/properties/`, payload, {
            headers: { Authorization: `Bearer ${user.token}` },
          })
            .then((res) => {
              resetForm({});
              setAlertText('Propiedad creada con éxito.');
              setAlertSeverity('success');
              setAlertOpen(true);
              console.log(res);
            })
            .catch((err) => {
              setAlertSeverity('error');
              setAlertText('Ocurrió un error. Intenta nuevamente.');
              setAlertOpen(true);
              console.log(err);
            });
          break;
        case 'EDIT':
          await APIClient.patch(`/properties/${pid}/`, payload, {
            headers: { Authorization: `Bearer ${user.token}` },
          })
            .then((res) => {
              setAlertText('Actualizado con éxito.');
              setAlertSeverity('success');
              setAlertOpen(true);
              console.log(res);
            })
            .catch((err) => {
              setAlertSeverity('error');
              setAlertText('Ocurrió un error. Intenta nuevamente.');
              setAlertOpen(true);
              console.log(err);
            });
          break;
        default:
          return null;
      }
    },
  });
  return (
    <Container className={classes.container} maxWidth="md">
      <Paper className={classes.paper}>
        <Typography
          align="center"
          component="h1"
          variant="h5"
          className={classes.title}
        >
          {action === 'CREATE' ? 'Crear propiedad' : 'Editar propiedad'}
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
                  label="URL de imagen"
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
                  label="Latitud"
                  name="latitude"
                  value={formik.values.latitude}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Longitud"
                  name="longitude"
                  value={formik.values.longitude}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Comuna"
                  name="districtName"
                  value={formik.values.districtName}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="top"
                  control={
                    <Checkbox
                      color="primary"
                      margin="normal"
                      fullWidth
                      name="waterService"
                      checked={formik.values.waterService}
                      value={formik.values.waterService}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Agua"
                  labelPlacement="start"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="top"
                  control={
                    <Checkbox
                      color="primary"
                      margin="normal"
                      fullWidth
                      name="electricityService"
                      checked={formik.values.electricityService}
                      value={formik.values.electricityService}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Electricidad"
                  labelPlacement="start"
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
