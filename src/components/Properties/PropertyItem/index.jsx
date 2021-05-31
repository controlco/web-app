/* eslint-disable react/prop-types */
import React from 'react';
import { Container, TextField, Grid, Button } from '@material-ui/core';
import Image from 'next/image';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { useFormik } from 'formik';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';
import CircularProgressWithLabel from '../../CircularProgressWithLabel';

import { useRouter } from 'next/router';
import useStyles from './PropertyItem.styles';
import { useAuth } from '../../../../hooks/auth';
import APIClient from '../../../../services/backend.services';

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

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
  // const router = useRouter();

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState('error');
  const [alertText, setAlertText] = React.useState('');
  const [fileToUpload, setFileToUpload] = React.useState('');
  const [imgSrc, setImgSrc] = React.useState(imageUrl);
  const { user } = useAuth();
  const classes = useStyles();
  const router = useRouter();
  const [progress, setProgress] = React.useState(-1);

  const [imgData, setImgData] = React.useState(null);
  const handleFileChange = (event) => {
    // eslint-disable-next-line no-undef
    const file = event.currentTarget.files[0];
    // eslint-disable-next-line no-undef
    const data = new FormData();
    data.append('cover', file);
    data.append('title', 'imggg');
    data.append('property', pid);
    data.append('file', file);
    // console.log(`file in handleFileChange ${file.name}`);
    // console.log(`data in handleFileChange ${data}`);
    setFileToUpload(file);
    setImgData(data);
    /* APIClient.post('/images/', data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then(() => console.log('success uploaded'));} */
  };

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
      file: null,
    },
    onSubmit: async (values, { resetForm }) => {
      // eslint-disable-next-line no-alert
      // eslint-disable-next-line no-undef
      // alert(JSON.stringify(values), null, 2);
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
            .then(async (res) => {
              resetForm({});
              setAlertText('Propiedad creada con éxito.');
              setAlertSeverity('success');
              setAlertOpen(true);
              await sleep(3000);
              router.push('/home');
              // console.log(res);
            })
            .catch((err) => {
              setAlertSeverity('error');
              setAlertText('Ocurrió un error. Intenta nuevamente.');
              setAlertOpen(true);
              //console.log(err);
            });
          break;
        case 'EDIT':
          await APIClient.patch(`/properties/${pid}/`, payload, {
            headers: { Authorization: `Bearer ${user.token}` },
          })
            .then(async (res) => {
              setAlertText('Actualizado con éxito.');
              setAlertSeverity('success');
              setAlertOpen(true);
              await sleep(3000);
              router.push('/home');
              //  console.log(res);
            })
            .catch((err) => {
              setAlertSeverity('error');
              setAlertText('Ocurrió un error. Intenta nuevamente.');
              setAlertOpen(true);
              // console.log(err);
            });
          break;
        default:
          return null;
      }
      setProgress(0);

      await APIClient.post('/images/', imgData, {
        headers: {
          'content-type': 'multipart/form-data',
        },

        onUploadProgress: (p) => {
          setProgress(Math.round((p.loaded * 100) / p.total));
        },
      })
        .then((res) => {
          // console.log('success uploaded');
          setProgress(-1);
          console.log(`success uploaded${res.data.cover}`);
          setImgSrc(
            `http://desarrollosoftware.tk/${res.data.cover
              .slice(-1)[0]
              .cover.replace('http://localhost:8000/', '')}`
          );
        })
        .catch((err) => {
          // console.log(err);
          setProgress(-1);
        });
    },
  });
  const handleUpload = async () => {
    setProgress(0);
    await APIClient.post('/images/', imgData, {
      headers: {
        'content-type': 'multipart/form-data',
      },

      onUploadProgress: (p) => {
        setProgress(Math.round((p.loaded * 100) / p.total));
      },
    })
      .then((res) => {
        setProgress(-1);
        setImgSrc(res.data.cover);
      })
      .catch((err) => {
        // console.log(err);
        setProgress(-1);
      });
  };

  React.useEffect(() => {}, [imgSrc]);

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
                    src={imgSrc}
                    alt="me"
                    width="fullWidth"
                    height="318px"
                    className={classes.imageBorder}
                  />
                </div>
              </Grid>
              {action === 'EDIT' && (
                <Grid item xs={12} className={classes.addMargin}>
                  <div className={classes.uploaderContainer}>
                    <input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      style={{ display: 'none' }}
                      type="file"
                      onChange={(event) => {
                        handleFileChange(event);
                      }}
                    />

                    <label htmlFor="contained-button-file">
                      <Button
                        className="btn-choose"
                        variant="outlined"
                        component="span"
                        style={{ textTransform: 'none' }}
                      >
                        Seleccionar imagen
                      </Button>
                    </label>
                    <div>{fileToUpload.name}</div>
                  </div>
                </Grid>
              )}
              {/* <div style={{ position: 'relative' }}>
                  <Button
                    variant="contained"
                    color="default"
                    fullWidth
                    onClick={() => handleUpload()}
                    disabled={progress > -1}
                    startIcon={
                      progress > -1 ? (
                        <CircularProgressWithLabel value={progress} size={24} />
                      ) : (
                        <CloudUploadIcon />
                      )
                    }
                  >
                    Subir
                  </Button>
                </div>
                  * /}
              
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
                disabled={progress > -1}
                startIcon={
                  // eslint-disable-next-line no-nested-ternary
                  action === 'EDIT' ? (
                    progress > -1 ? (
                      <CircularProgressWithLabel value={progress} size={24} />
                    ) : (
                      <CloudUploadIcon />
                    )
                  ) : null
                }
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
