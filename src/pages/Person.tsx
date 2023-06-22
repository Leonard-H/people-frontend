import React, { useState } from "react";
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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";

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
  firstCell: {
    width: 10,
    margin: 0,
    padding: 0
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
  const { id } = useParams() as {id: string};
  const [livedInOpen, setLivedInOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: 20
            }}
          >
            <Typography variant="h5">{data.person.name}</Typography>
            <Typography variant="h6">
              {" "}
              {data.person.bornOn
                ? `*${formatDate(data.person.bornOn, { yearOnly: true })}`
                : ""}
              {data.person.diedOn
                ? ` †${formatDate(data.person.diedOn, { yearOnly: true })}`
                : ""}
            </Typography>
          </div>

          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  align="left"
                  className={classes.firstCell}
                ></TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="left">
                  {data.person.firstNames} {data.person.familyName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="left"
                  className={classes.firstCell}
                ></TableCell>
                <TableCell align="right">Geburt</TableCell>
                <TableCell align="left">
                  {data.person.bornOn ? formatDate(data.person.bornOn) : "-"},{" "}
                  {data.person.bornIn}
                </TableCell>
              </TableRow>
              {data.person.diedOn ? (
                <TableRow>
                  <TableCell
                    align="left"
                    className={classes.firstCell}
                  ></TableCell>
                  <TableCell align="right">Tod</TableCell>
                  <TableCell align="left">
                    {formatDate(data.person.diedOn)}, {data.person.diedIn}
                  </TableCell>
                </TableRow>
              ) : null}
              <TableRow>
                <TableCell align="left" className={classes.firstCell}>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setLivedInOpen(!livedInOpen)}
                  >
                    {livedInOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </TableCell>
                <TableCell align="right">Wohnort</TableCell>
                <TableCell align="left">
                  {data.person.livedIn[data.person.livedIn.length - 1]} (
                  {data.person.diedOn ? "zuletzt" : "derzeitig"})
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  className={classes.firstCell}
                  style={{ height: 0, paddingBottom: 0, paddingTop: 0 }}
                />
                <TableCell
                  align="right"
                  style={{
                    paddingBottom: 0,
                    paddingTop: 0,
                    position: "relative"
                  }}
                >
                  <Collapse in={livedInOpen} timeout="auto" unmountOnExit>
                    <span style={{ position: "absolute", right: 15, top: 0 }}>
                      Geschichte
                    </span>
                  </Collapse>
                </TableCell>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse in={livedInOpen} timeout="auto" unmountOnExit>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          data.person.livedIn && data.person.livedIn[0]
                            ? list(data.person.livedIn)
                            : "-"
                      }}
                    />
                  </Collapse>
                </TableCell>
              </TableRow>
              {/* Jobs */}
              <TableRow>
                <TableCell align="left" className={classes.firstCell}>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setJobsOpen(!jobsOpen)}
                  >
                    {jobsOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </TableCell>
                <TableCell align="right">Beruf</TableCell>
                <TableCell align="left">
                  {data.person.jobs
                    ? data.person.jobs[data.person.jobs.length - 1] +
                      ` (${data.person.diedOn ? "zuletzt" : "derzeitig"})`
                    : "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  className={classes.firstCell}
                  style={{ height: 0, paddingBottom: 0, paddingTop: 0 }}
                />
                <TableCell
                  align="right"
                  style={{
                    paddingBottom: 0,
                    paddingTop: 0,
                    position: "relative"
                  }}
                >
                  <Collapse in={jobsOpen} timeout="auto" unmountOnExit>
                    <span style={{ position: "absolute", right: 15, top: 0 }}>
                      Geschichte
                    </span>
                  </Collapse>
                </TableCell>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse in={jobsOpen} timeout="auto" unmountOnExit>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          data.person.jobs && data.person.jobs[0]
                            ? list(data.person.jobs)
                            : "-"
                      }}
                    />
                  </Collapse>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid xs={3} className={classes.borderOverlay}>
          <Typography color="textSecondary" variant="h5">
            Verheiratet mit:
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Kenn-Nummer">
            <Typography color="textSecondary" variant="h6">
              {data.person.id}
            </Typography>
          </Tooltip>
          <Typography
            style={{ marginLeft: 20 }}
            color="textSecondary"
            variant="body2"
          >
            Quellen:{" "}
            {data.person.sources && data.person.sources[0]
              ? listHorizontal(data.person.sources)
              : "-"}
          </Typography>
          <Typography
            style={{ marginLeft: 20 }}
            color="textSecondary"
            variant="body2"
          >
            {data.person.status ? `Stand ${data.person.status}` : ""}
          </Typography>
        </div>

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

export function getSiblingArray(person: PersonType) {
  const allSiblings = person.parents
    .map(p => p.descendants)
    .reduce((total, item) => [...total, ...item], []);
  const siblings = Array.from(new Set(allSiblings.map(s => s.id))).map(id =>
    allSiblings.find(s => s.id === id)
  );
  return siblings;
}

function list(arr: string[]) {
  return arr.reduce(
    (total, item) =>
      total + (total ? ", </br>" : "") + `<span>${item.trim()}</span>`,
    ""
  );
}

function listHorizontal(arr: string[]) {
  return arr.reduce(
    (total, item) => total + (total ? ", " : "") + item.trim(),
    ""
  );
}
