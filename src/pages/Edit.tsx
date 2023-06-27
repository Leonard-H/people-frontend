import React, { useMemo } from "react";
import { useRegisterMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useFormik } from "formik";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { Save } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20
  }
});

type ValuesKey = "familyId"|"name"|"firstNames"|"familyName"|"religion"|"title"|"bornOn"|"bornIn"|"parentIds"|"descendantIds"|"diedOn"|"diedIn"|"livedIn"|"jobs"|"familyStatus"|"sources"|"sbId"|"status"|"notes"|"descendantNotes"|"bornFamilyName";

export const EditForm: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const [register] = useRegisterMutation();

  const { handleSubmit, handleChange, values, handleBlur, initialValues } = useFormik({
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
      livedIn: "",
      jobs: "",
      familyStatus: "",
      sources: "",
      sbId: "",
      status: "",
      notes: "",
      descendantNotes: "",
      bornFamilyName: ""
    },
    onSubmit: async variables => {
      console.log("form submitted");
      const response = await register();

      console.log(response);

      history.push("/");
    }
  });

  const changed = useMemo(() => {
    for (const key of Object.keys(values)) {
      const k = key as ValuesKey;
      if (values[k] !== initialValues[k]) return true;
    }
    return false;
  }, [values]);

  const save = () => {

  };

  const theme = useTheme();

  return (
    <Container maxWidth="md">
      <div className={classes.field} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5">Eintrag für <span style={{ color: theme.palette.primary.main }}>{values.familyId}</span></Typography>
        <IconButton onClick={save} disabled={!changed}>{<Save style={{ color: changed ? "black" : theme.palette.grey[400] }} />}</IconButton>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container className={classes.field}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Kenn Nummer"
                variant="outlined"
                type="text"
                id="familyId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.familyId}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Kenn Name"
                variant="outlined"
                id="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container className={classes.field}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Vornamen"
                variant="outlined"
                id="firstNames"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstNames}
              />
            </FormControl>
          </Grid>
          <Grid item sm={3}>
            <FormControl fullWidth>
              <TextField
                label="Nachname"
                variant="outlined"
                id="familyName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.familyName}
              />
            </FormControl>
          </Grid>
          <Grid item sm={3}>
            <FormControl fullWidth>
              <TextField
                label="Gerburtsname"
                variant="outlined"
                id="bornFamilyName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bornFamilyName}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container className={classes.field}>
          <Grid item sm={3}>
            <FormControl fullWidth>
              <TextField
                label="Titel"
                variant="outlined"
                id="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
            </FormControl>
          </Grid>
          <Grid item sm={3}>
            <FormControl fullWidth>
              <TextField
                label="Konfession"
                variant="outlined"
                id="religion"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.religion}
              />
            </FormControl>
          </Grid>
          <Grid item sm={3}>
            <FormControl fullWidth>
              <TextField
                label="Familienstand"
                variant="outlined"
                id="familyStatus"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.familyStatus}
              />
            </FormControl>
          </Grid>
          <Grid item sm={3}>
            <FormControl fullWidth>
              <TextField
                label="Schwaab ID"
                variant="outlined"
                id="sbId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.sbId}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container className={classes.field}>
          <Grid item sm={3}>
            <FormControl fullWidth>
              <TextField
                label="Geboren am"
                variant="outlined"
                id="bornOn"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bornOn}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item sm={3}>
            <FormControl fullWidth>
              <TextField
                label="Geboren in"
                variant="outlined"
                id="bornIn"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bornIn}
              />
            </FormControl>
          </Grid>
          <Grid item sm={3}>
            <FormControl fullWidth>
              <TextField
                label="Gestorben am"
                variant="outlined"
                id="diedOn"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.diedOn}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item sm={3}>
            <FormControl fullWidth>
              <TextField
                label="Gestorben in"
                variant="outlined"
                id="diedIn"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.diedIn}
              />
            </FormControl>
          </Grid>
        </Grid>

        <FormControl fullWidth>
          <TextField
            label="Eltern Kenn-Nrm. (zuerst Vater, dann Mutter, kommagetrennt)"
            variant="outlined"
            id="parentIds"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.parentIds}
          />
        </FormControl>

        <Grid container className={classes.field}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Nachkommen Kenn-Nrn. (chronologisch, kommagetrennt)"
                variant="outlined"
                id="descendantIds"
                multiline
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.descendantIds}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <TextField
                label={`Nachkommen (e.g. "2 Söhne, 1 Tochter")`}
                variant="outlined"
                id="descendantNotes"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.descendantNotes}
              />
            </FormControl>
          </Grid>
        </Grid>

        <FormControl fullWidth>
          <TextField
            label="Wohnorte (chronologisch, kommagetrennt)"
            variant="outlined"
            id="livedIn"
            multiline
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.livedIn}
          />
        </FormControl>

        <FormControl fullWidth className={classes.field}>
          <TextField
            label="Berufe (chronologisch, kommagetrennt)"
            variant="outlined"
            multiline
            id="jobs"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.jobs}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Bemerkungen"
            variant="outlined"
            id="notes"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.notes}
          />
        </FormControl>

        <FormControl fullWidth className={classes.field}>
          <TextField
            label="Quellen"
            variant="outlined"
            id="sources"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.sources}
          />
        </FormControl>

        <Button color="primary" variant="contained" type="submit">
          Sichern
        </Button>
      </form>
    </Container>
  );
};
