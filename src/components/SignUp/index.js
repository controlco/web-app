import React from "react";
import useStyles from "./SignUp.styles";
import { useFormik } from "formik";
import {
  Button,
  Container,
  Grid,
  TextField,
  Paper,
  Typography,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import Link from "../Link";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      lastName: "",
      rut: "",
      birthday: new Date(),
    },
    //validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
                name="lastNames"
                label="Apellidos"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  inputVariant="outlined"
                  format="MM/dd/yyyy"
                  clearable
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
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
