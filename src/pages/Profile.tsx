import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import MuiLink from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { setAccessToken } from "../accessToken";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 200
  },
  tableContainer: {
    maxWidth: 600,
    display: "block",
    margin: "0 auto",
    marginBottom: 40
  },
  button: {
    display: "block",
    margin: "0 auto"
  }
});

type Props = {};
const Profile: React.FC<Props> = () => {
  const classes = useStyles();
  const history = useHistory();
  const { data } = useMeQuery();
  const [logoutMutation, { client }] = useLogoutMutation();
  const logout = async () => {
    try {
      await logoutMutation();
      setAccessToken("");
      await client!.resetStore();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Email
              </TableCell>
              <TableCell align="right">
                {data && data.me && data.me.email}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Benutzername
              </TableCell>
              <TableCell align="right">
                {data && data.me && data.me.username}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Name
              </TableCell>
              <TableCell align="right">
                {data && data.me && data.me.firstName}{" "}
                {data && data.me && data.me.familyName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Familienchroink ID
              </TableCell>
              <TableCell align="right">
                <MuiLink style={{ cursor: "pointer" }} onClick={() => history.push(`/person/${data && data.me && data.me.familyId}`)}>
                  {data && data.me && data.me.familyId}
                </MuiLink>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        style={{ marginBottom: 20 }}
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        onClick={() => history.push("/change-password")}
      >
        passwort ändern
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        onClick={logout}
      >
        abmelden
      </Button>
    </Container>
  );
};

export default Profile;
