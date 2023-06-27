import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import ReactMarkdown from "react-markdown";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  typography: theme.typography.body1
}));

type Props = {};
const About: React.FC<Props> = () => {
  const classes = useStyles();
  const [about, setAbout] = useState("");
  console.log("about: " + about);
  useEffect(() => {
    import(`../md/about.md`)
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => setAbout(res))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });
  console.log(about);
  return (
    <Container maxWidth="sm">
      <ReactMarkdown
        children={about}
        className={`${classes.typography} article`}
      />
    </Container>
  );
};

export default About;

export {};
