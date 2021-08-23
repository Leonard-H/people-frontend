import React, { useState, useMemo } from "react";
import { usePeopleQuery, PeopleQuery } from "../generated/graphql";
import { useLocation, useHistory } from "react-router-dom";
import qs from "qs";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import SortIcon from "@material-ui/icons/Sort";
import MenuItem from "@material-ui/core/MenuItem";
import formatDate, { getMilliseconds } from "../util/formatDate";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1, 0, 1, 0),
    cursor: "pointer"
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  divider: {
    margin: theme.spacing(1, 0, 1, 0)
  }
}));

const options: {
  display: string;
  key: "firstName" | "familyName" | "birthday" | "age";
}[] = [
  { display: "Vornamen", key: "firstName" },
  { display: "Nachnamen", key: "familyName" },
  { display: "Geburtsdatum", key: "birthday" },
  { display: "Alter", key: "age" }
];

type ListPeopleProps = {
  people: PeopleQuery["people"];
};
const ListPeople: React.FC<ListPeopleProps> = ({ people }) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <List>
      {people.map(person => (
        <Paper
          className={classes.paper}
          onClick={() => history.push(`/person/${person.id}`)}
          key={person.id}
        >
          <ListItem>
            <ListItemText
              primary={person.name}
              secondary={`${person.firstNames ? person.firstNames : "-"} ${
                person.familyName ? person.familyName : "-"
              }${person.bornOn ? `, *${formatDate(person.bornOn)}` : ""}`}
            />
          </ListItem>
        </Paper>
      ))}
    </List>
  );
};

type PeopleType = { main: PeopleQuery["people"]; rest?: PeopleQuery["people"] };

type Props = {};
const Search: React.FC<Props> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [sortBy, setSortBy] = useState<
    "" | "firstName" | "familyName" | "birthday" | "age"
  >("");

  const location = useLocation();
  const classes = useStyles();
  const name = qs.parse(location.search, { ignoreQueryPrefix: true }).name as
    | string
    | undefined;
  const { data, loading } = usePeopleQuery({ variables: { name } });

  const people = useMemo<PeopleType>((): PeopleType => {
    if (!data) return { main: [] };
    if (!data.people[0]) return { main: [] };
    switch (sortBy) {
      case "firstName":
        return {
          main: data.people
            .filter(p => p.firstNames)
            .sort((a, b) => {
              if (!a.firstNames || !b.firstNames) return 0;
              if (!a) return -1;
              if (!b) return 1;
              return a.firstNames > b.firstNames ? 1 : -1;
            }),
          rest: data.people.filter(p => !p.firstNames)
        };
      case "familyName":
        return {
          main: data.people
            .filter(p => p.familyName)
            .sort((a, b) => {
              if (!a.familyName || !b.familyName) return 0;
              if (!a) return -1;
              if (!b) return 1;
              return a.familyName > b.familyName ? 1 : -1;
            }),
          rest: data.people.filter(p => !p.familyName)
        };
      case "birthday":
        return {
          main: data.people
            .filter(p => p.bornOn)
            .sort((a, b) => {
              if (!a.bornOn || !b.bornOn) return 0;
              if (!a) return -1;
              if (!b) return 1;
              return getMilliseconds(a.bornOn) > getMilliseconds(b.bornOn)
                ? 1
                : -1;
            }),
          rest: data.people.filter(p => !p.bornOn)
        };
      // case "age":
      //   return;

      default:
        return { main: data.people };
    }
  }, [data, sortBy]);

  if (!name) return <Typography>Es wurde nichts gesucht.</Typography>;
  if (loading) return <CircularProgress />;

  return (
    <Container>
      <div className={classes.flexContainer}>
        <Typography variant="h5">Personen</Typography>
        <div>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={e => setAnchorEl(e.currentTarget)}
          >
            <SortIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem disabled>Sortieren nach</MenuItem>
            {options.map(option => (
              <MenuItem
                selected={option.key === sortBy}
                key={option.key}
                onClick={() => {
                  setSortBy(option.key);
                  setAnchorEl(null);
                }}
              >
                {option.display}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      {data && <ListPeople people={people.main} />}
      {people.rest && people.rest[0] ? (
        <>
          <Divider className={classes.divider} />
          <ListPeople people={people.rest} />
        </>
      ) : null}
    </Container>
  );
};

export default Search;
