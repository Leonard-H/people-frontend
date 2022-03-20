import React from "react";
import { useRegisterMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20
  }
});

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const [register] = useRegisterMutation();

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      email: "",
      username: "",
      firstName: "",
      familyName: "",
      familyId: "",
      password: "",
      userType: 0
    },
    onSubmit: async variables => {
      console.log("form submitted");
      const response = await register({ variables });

      console.log(response);

      history.push("/");
    }
  });

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth className={classes.field}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            id="email"
            onChange={handleChange}
            value={values.email}
          />
        </FormControl>

        <FormControl fullWidth className={classes.field}>
          <TextField
            label="Benutzername"
            variant="outlined"
            id="username"
            onChange={handleChange}
            value={values.username}
          />
        </FormControl>

        <Grid container className={classes.field}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Vorname"
                variant="outlined"
                id="firstName"
                onChange={handleChange}
                value={values.firstName}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Nachname"
                variant="outlined"
                id="familyName"
                onChange={handleChange}
                value={values.familyName}
              />
            </FormControl>
          </Grid>
        </Grid>

        <FormControl fullWidth className={classes.field}>
          <TextField
            label="Familienchronik ID"
            variant="outlined"
            id="familyId"
            onChange={handleChange}
            value={values.familyId}
          />
        </FormControl>
        <Grid container className={classes.field}>
          <Grid item sm={9}>
            <FormControl fullWidth>
              <TextField
                label="Passwort"
                variant="outlined"
                id="password"
                type="password"
                onChange={handleChange}
                value={values.password}
              />
            </FormControl>
          </Grid>
          <Grid item sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Benutzerart</InputLabel>
              <Select
                id="userType"
                value={values.userType}
                onChange={handleChange("userType")}
                label="Benutzerart"
              >
                <MenuItem value={0}>Basic</MenuItem>
                <MenuItem value={1}>Pro</MenuItem>
                <MenuItem value={2}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          Registrieren
        </Button>
      </form>
    </Container>
  );
};
