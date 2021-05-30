import React from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Container,
  Grid,
  TextField,
  Paper,
  Typography,
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useRouter } from 'next/router';
import Link from '../Link';
import useStyles from './SignUp.styles';
import APIClient from '../../../services/backend.services';

const SignUp = () => {
  // const [selectedDate, setDate] = React.useState(new Date());
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState('error');
  const [alertText, setAlertText] = React.useState('');
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      lastName: '',
      rut: '',
      birthdate: null,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(`values \n ${JSON.stringify(values, null, 2)}`);
      const payload = {
        email: values.email,
        password: values.password,
        first_name: values.name,
        last_name: values.lastName,
      };
      APIClient.post('/signup', payload)
        .then((res) => {
          console.log(res);
          resetForm({});
          setAlertSeverity('success');
          setAlertText('Registrado exitosamente');
          setAlertOpen(true);
        })
        .catch((err) => {
          console.log(err.response);
          setAlertText('Algo salió mal. Intenta nuevamente.');
          setAlertSeverity('error');
          setAlertOpen(true);
        });
    },
  });

  /* const handleDateChange = (e) => {
    setDate(e.target.value);
    formik.setFieldValue('birthday', e.target.value, false);
  }; */
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography align="center" component="h1" variant="h5">
          Registrate
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                autoComplete="off"
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                fullWidth
                id="password"
                name="password"
                label="Contraseña"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                fullWidth
                id="name"
                name="name"
                label="Nombre"
                value={formik.values.name}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                fullWidth
                id="lastNames"
                name="lastName"
                label="Apellidos"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                fullWidth
                id="rut"
                name="rut"
                label="Rut"
                value={formik.values.rut}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Collapse in={alertOpen}>
              <Alert
                severity={alertSeverity}
                action={
                  alertSeverity === 'success' ? (
                    <Button
                      color="inherit"
                      size="small"
                      onClick={() => router.push('/')}
                    >
                      Login
                    </Button>
                  ) : (
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
                  )
                }
              >
                {alertText}
              </Alert>
            </Collapse>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Registrarse
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link href="/" variant="body2">
                Ya tienes una cuenta? Inicia sesión
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
