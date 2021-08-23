import React, { useState } from "react";
import { useLoginMutation, MeDocument, MeQuery } from "../generated/graphql";
import { setAccessToken } from "../accessToken";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  page: {
    background: theme.palette.type === "light" ? grey[100] : grey[900]
  },
  field: {
    marginTop: 20,
    marginBottom: 20
  }
}));

interface Props {}

export const Login: React.FC<Props> = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const history = useHistory();

  return (
    <Container maxWidth="sm" className={classes.page}>
      <Typography variant="h3">Familien Chronik</Typography>
      <form
        onSubmit={async e => {
          e.preventDefault();
          const response = await login({
            variables: {
              email,
              password
            },
            update: (store, { data }) => {
              if (!data) {
                return null;
              }

              store.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: data.login.user
                }
              });
            }
          });

          if (response && response.data) {
            setAccessToken(response.data.login.accessToken);
          }

          history.push("/");
        }}
      >
        <FormControl fullWidth className={classes.field}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            required
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth className={classes.field}>
          <TextField
            label="Passwort"
            required
            variant="outlined"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>

        <Button color="primary" variant="contained" type="submit">
          Anmelden
        </Button>
      </form>
    </Container>
  );
};
