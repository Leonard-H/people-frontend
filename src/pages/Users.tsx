import React from "react";
import UserTable from "../components/UserTable";
import Button from "@material-ui/core/Button";
import { PersonAdd } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  registerButtonContainer: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center"
  },
  userPage: {
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(0, 3, 0, 3)
    }
  }
}));

interface Props {}

const Users: React.FC<Props> = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.userPage}>
      <UserTable />
      <div className={classes.registerButtonContainer}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAdd />}
          onClick={() => history.push("/register")}
        >
          Registrieren
        </Button>
      </div>
    </div>
  );
};

export default Users;
