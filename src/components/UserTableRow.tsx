import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core";
import { KeyboardArrowUp, KeyboardArrowDown, Delete } from "@material-ui/icons";
import {
  useDeleteUserMutation,
  UsersDocument,
  UsersQuery
} from "../generated/graphql";

const useStyles = makeStyles(theme => ({
  tableCell: {
    position: "relative"
  },
  delete: {
    position: "absolute",
    top: 2,
    right: theme.spacing(2)
  },
  arrow: {
    position: "absolute",
    top: 12,
    left: theme.spacing(2)
  },
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
}));

type Props = {
  user: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    familyName: string;
    familyId: string;
  };
};
const UserTableRow: React.FC<Props> = ({ user }) => {
  const classes = useStyles();
  const [deleteUserMutation] = useDeleteUserMutation();
  const deleteUser = (id: string) => {
    deleteUserMutation({
      variables: { id },
      update: (store, { data }) => {
        if (!data) {
          return null;
        }

        store.writeQuery<UsersQuery>({
          query: UsersDocument,
          data: {
            users: data.deleteUser
          }
        });
      }
    });
  };
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell className={classes.tableCell}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            className={classes.arrow}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {user.email}
        </TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.firstName}</TableCell>
        <TableCell>{user.familyName}</TableCell>
        <TableCell>{user.familyId}</TableCell>
        <TableCell align="right" className={classes.tableCell}>
          <IconButton
            className={classes.delete}
            onClick={() => deleteUser(user.id)}
          >
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography>User ID: {user.id}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default UserTableRow;
