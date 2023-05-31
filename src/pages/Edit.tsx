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

export const EditForm: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const [register] = useRegisterMutation();

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      familyId: "",
      name: "",
      firstNames: "",
      familyName: "",
      religion: "",
      title: "",
      bornOn: "",
      bornIn: "",
      parentIds: "",
      descendantIds: "",
      diedOn: "",
      diedIn: "",
      age: "",
      livedIn: "",
      jobs: "",
      familyStatus: "",
      sources: "",
      sbId: "",
      status: "",
    },
    onSubmit: async variables => {
      console.log("form submitted");
      const response = await register();

      console.log(response);

      history.push("/");
    }
  });

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>

      </form>
    </Container>
  );
};
