import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useUsersQuery } from "../generated/graphql";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserTableRow from "./UserTableRow";

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 650
  },
  bold: {
    fontWeight: "bold"
  }
}));

const UserTable = () => {
  const classes = useStyles();
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });

  if (!data) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className={classes.bold}>Email</TableCell>
            <TableCell className={classes.bold}>Benutzername</TableCell>
            <TableCell className={classes.bold}>Vorname</TableCell>
            <TableCell className={classes.bold}>Nachname</TableCell>
            <TableCell className={classes.bold}>Familienchronik ID</TableCell>
            <TableCell className={classes.bold} align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.users.map(user => (
            <UserTableRow user={user} key={user.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
