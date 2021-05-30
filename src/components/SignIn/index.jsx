import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
// eslint-disable-next-line import/no-named-as-default-member
// eslint-disable-next-line import/no-named-as-default
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Link from '../Link';
import { useAuth } from '../../../hooks/auth';

import useStyles from './SignIn.styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        {'CtrlCo Propiedades '}
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function SignIn() {
  const { login } = useAuth();
  const router = useRouter();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      // eslint-disable-next-line no-alert
      // eslint-disable-next-line no-undef
      const { email, password } = values;
      await login(email, password)
        .then(() => router.push('/home'))
        .catch((err) => {
          console.log(err.response);
          setAlertOpen(true);
        });
      // alert(JSON.stringify(values, null, 2));
    },
  });


  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography
          align="center"
          component="h1"
          variant="h5"
          className={classes.title}
        >
          Inicia sesión
        </Typography>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {/* <FormControlLabel
            control={
              <Checkbox
                name="remember"
                value={formik.values.remember}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="current-password"
                fullWidth
                id="password"
                name="password"
                label="Contraseña"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                variant="outlined"
              />
            }
            label="Recordar usuario"
          />
          */}
          <Collapse in={alertOpen}>
            <Alert
              severity="error"
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
              Algo salió mal. Intenta nuevamente.
            </Alert>
          </Collapse>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs={12}>
              <Link href="/" variant="body2">
                Olvidaste la contraseña?
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="/signup/" variant="body2">
                Registrarse
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
