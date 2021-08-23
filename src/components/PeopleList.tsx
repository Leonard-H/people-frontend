import React from "react";
import { Person } from "../generated/graphql";
import Masonry from "react-masonry-css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const breakpoints = {
  default: 3,
  1100: 2,
  800: 1
};

const useStyles = makeStyles({
  pointer: {
    cursor: "pointer"
  }
});

type Props = {
  people: Pick<Person, "name" | "id" | "bornOn">[];
};
const PeopleList: React.FC<Props> = ({ people }) => {
  const classes = useStyles();
  const history = useHistory();
  if (!people[0])
    return (
      <Typography variant="h6" color="textSecondary">
        -
      </Typography>
    );
  return (
    <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {people.map(person => (
        <Card
          key={person.id}
          onClick={() => history.push(`/person/${person.id}`)}
          className={classes.pointer}
        >
          <CardHeader title={person.name} subheader={person.id} />
        </Card>
      ))}
    </Masonry>
  );
};

export default React.memo(PeopleList);
