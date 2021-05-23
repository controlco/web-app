import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
// eslint-disable-next-line import/no-named-as-default-member
// eslint-disable-next-line import/no-named-as-default
import Link from '../Link';
import { useRouter } from 'next/router';
import { useAuth } from '../../../hooks/auth';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const { login } = useAuth();
  const router = useRouter();
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
        .then((res) => router.push('/home'))
        .catch((err) => console.log(err.response));
      // alert(JSON.stringify(values, null, 2));
    },
  });
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
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
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link href="#" variant="body2">
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
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
