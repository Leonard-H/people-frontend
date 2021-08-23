import React from "react";
import Container from "@material-ui/core/Container";
import { useParams, useHistory } from "react-router-dom";
import { usePersonQuery, Person as PersonType } from "../generated/graphql";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import formatDate from "../util/formatDate";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  space: {
    height: 30
  },
  paper: {
    cursor: "pointer",
    padding: 15
  },
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  verticalList: {
    flexDirection: "column"
  },
  horizontalPaper: {
    [theme.breakpoints.up("sm")]: {
      width: 200
    }
  },
  border: {
    borderRight: "solid 1px rgb(210, 210, 210)",
    marginRight: -20,
    paddingRight: 8
  },
  borderOverlay: {
    paddingLeft: 28
  }
}));

type Props = { id: string };
const Person: React.FC<Props> = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { data, loading } = usePersonQuery({ variables: { id } });
  if (loading) return <CircularProgress />;
  if (!data || !data.person) return <Typography>error</Typography>;
  return (
    <Container>
      <Typography color="textSecondary" variant="h5">
        Eltern:
      </Typography>
      <DisplayList people={data.person.parents} horizontal={true} />
      <div className={classes.space} />
      <Grid container>
        <Grid xs={3} className={classes.border}>
          <Typography color="textSecondary" variant="h5">
            Geschwister:
          </Typography>
          <DisplayList
            people={
              (getSiblingArray(
                (data.person as unknown) as PersonType
              ) as unknown) as DisplayListProps["people"]
            }
            horizontal={false}
            id={data.person.id}
          />
        </Grid>
        <Grid
          item
          xs={6}
          className={`${classes.border} ${classes.borderOverlay}`}
        >
          <Typography>Kenn Name: {data.person.name}</Typography>
          <Typography>
            Voller Name: {data.person.firstNames} {data.person.familyName}
          </Typography>
          <Typography>
            Geburtstag:{" "}
            {data.person.bornOn ? formatDate(data.person.bornOn) : "-"}
          </Typography>
          <Typography>
            Geburtsort: {data.person.bornIn ? data.person.bornIn : "-"}
          </Typography>
          <Typography>
            Wohnorte:{" "}
            {data.person.livedIn && data.person.livedIn[0]
              ? list(data.person.livedIn)
              : "-"}
          </Typography>
          <Typography>
            Berufe:{" "}
            {data.person.jobs && data.person.jobs[0]
              ? list(data.person.jobs)
              : "-"}
          </Typography>
          <Typography>
            Status: {data.person.status ? data.person.status : "-"}
          </Typography>
          <Typography>
            Quellen:{" "}
            {data.person.sources && data.person.sources[0]
              ? list(data.person.sources)
              : "-"}
          </Typography>
        </Grid>
        <Grid xs={3} className={classes.borderOverlay}>
          <Typography color="textSecondary" variant="h5">
            Verheirated mit:
          </Typography>

          <DisplayList
            people={
              (data.person.marriages
                .filter(m => m)
                .map(m => m.person) as unknown) as DisplayListProps["people"]
            }
            horizontal={false}
          />
        </Grid>
      </Grid>
      <div className={classes.space} />
      <Typography color="textSecondary" variant="h5">
        Nachkommen:
      </Typography>
      <DisplayList people={data.person.descendants} horizontal={true} />
      <div className={classes.space} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Tooltip title="Kenn-Nummer">
          <Typography color="textSecondary" variant="h6">
            {data.person.id}
          </Typography>
        </Tooltip>
        <Tooltip title="Schwaab ID">
          <Typography color="textSecondary" variant="h6">
            {data.person.sbId ? data.person.sbId : "-"}
          </Typography>
        </Tooltip>
      </div>
    </Container>
  );
};

export default Person;

type DisplayListProps = {
  people: { id: string; name: string }[];
  horizontal: boolean;
  id?: string;
};
function DisplayList({
  people,
  horizontal,
  id
}: DisplayListProps): React.ReactElement {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div
      className={`${classes.flexContainer} ${
        horizontal ? "" : classes.verticalList
      }`}
    >
      {people
        .map(p => (p ? p : { id: "", name: "-" }))
        .map(person => {
          return (
            <Paper
              className={`${classes.paper} ${
                horizontal ? classes.horizontalPaper : ""
              }`}
              key={person.id}
              onClick={
                person.id
                  ? () => history.push(`/person/${person.id}`)
                  : undefined
              }
              style={
                person.id === id
                  ? { backgroundColor: "rgb(230, 230, 230)" }
                  : {}
              }
            >
              <Typography>{person.id ? person.name : "-"}</Typography>
            </Paper>
          );
        })}
    </div>
  );
}

function getSiblingArray(person: PersonType) {
  const allSiblings = person.parents
    .map(p => p.descendants)
    .reduce((total, item) => [...total, ...item], []);
  const siblings = Array.from(new Set(allSiblings.map(s => s.id))).map(id =>
    allSiblings.find(s => s.id === id)
  );
  return siblings;
}

function list(arr: string[]) {
  return arr.reduce((total, item) => total + (total ? ", " : "") + item, "");
}
