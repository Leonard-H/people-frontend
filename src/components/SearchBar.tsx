import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Search as SearchIcon } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));

type Props = {};
const SearchBar: React.FC<Props> = () => {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState("");
  // const { data, loading } = usePeopleQuery();
  // const [open, setOpen] = useState(false);
  // const [options, setOptions] = useState<any>([]);
  //
  // React.useEffect(() => {
  //   let active = true;
  //   if (!loading) {
  //     return undefined;
  //   }
  //   (async () => {
  //     if (active && data && data.people) {
  //       setOptions(data.people);
  //     }
  //   })();
  //   return () => {
  //     active = false;
  //   };
  // }, [loading]);
  //
  // useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        onChange={e => setName(e.target.value)}
        onKeyUp={e => {
          if (e.keyCode === 13) history.push(`/search?name=${name}`);
        }}
        placeholder="Suche…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
  // return (
  //   <Autocomplete
  //     className={classes.width}
  //     open={open}
  //     onOpen={() => setOpen(true)}
  //     onClose={() => setOpen(false)}
  //     options={options}
  //     loading={loading}
  //     renderInput={params => (
  //       <div className={classes.search}>
  //         <div className={classes.searchIcon}>
  //           <SearchIcon />
  //         </div>
  //         <InputBase
  //           placeholder="Suche…"
  //           classes={{
  //             root: classes.inputRoot,
  //             input: classes.inputInput
  //           }}
  //           inputProps={{ "aria-label": "search" }}
  //         />
  //       </div>
  //     )}
  //   />
  // );
};

export default SearchBar;
