import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useChangePasswordMutation } from "../generated/graphql";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20
  }
});

type Props = {};
const ChangePassword: React.FC<Props> = () => {
  const history = useHistory();
  const classes = useStyles();
  const [error, setError] = useState("");
  const [changePassword, { data }] = useChangePasswordMutation();
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    },
    onSubmit: async variables => {
      console.log("form submitted");
      if (variables.newPassword !== variables.confirmNewPassword)
        return setError("Passwörter stimmen nicht überein.");
      setError("");
      const response = await changePassword({ variables });
      console.log(response);
      if (response.data && response.data.changePassword.success)
        history.push("/");
    }
  });
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth className={classes.field}>
          <TextField
            label="Jetziges Passwort"
            variant="outlined"
            type="password"
            id="oldPassword"
            required
            onChange={handleChange}
            value={values.oldPassword}
          />
        </FormControl>
        <FormControl fullWidth className={classes.field}>
          <TextField
            label="Neues Passwort"
            variant="outlined"
            type="password"
            id="newPassword"
            required
            onChange={handleChange}
            value={values.newPassword}
          />
        </FormControl>
        <FormControl fullWidth className={classes.field}>
          <TextField
            label="Neues Passwort bestätigen"
            variant="outlined"
            type="password"
            id="confirmNewPassword"
            required
            onChange={handleChange}
            value={values.confirmNewPassword}
          />
        </FormControl>
        <Button color="primary" variant="contained" type="submit">
          Passwort Vernädern
        </Button>
      </form>
      {data && !data.changePassword.success ? (
        <Alert severity="error">{data.changePassword.error}</Alert>
      ) : null}
      {error ? <Alert severity="error">{error}</Alert> : null}
    </Container>
  );
};

export default ChangePassword;
