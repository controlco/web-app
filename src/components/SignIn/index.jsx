import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
// eslint-disable-next-line import/no-named-as-default-member
// eslint-disable-next-line import/no-named-as-default
import Paper from '@material-ui/core/Paper';
import Link from '../Link';

import useStyles from './SignIn.styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Ctrl Co
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function SignIn() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-alert
      // eslint-disable-next-line no-undef
      alert(JSON.stringify(values, null, 2));
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
            </Grid>
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  value={formik.values.remember}
                  onChange={formik.handleChange}
                  color="primary"
                />
              }
              label="Recordar usuario"
            />
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Ingresar
              </Button>
            </Grid>
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
