import React, { ReactChild, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Menu, People, Storage } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import { green, grey } from "@material-ui/core/colors";
import SearchBar from "./SearchBar";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  page: {
    background: theme.palette.type === "light" ? grey[50] : grey[900],
    width: "100%",
    margin: 0,
    [theme.breakpoints.up("md")]: {
      marginLeft: drawerWidth
    }
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  root: {
    display: "flex",
    margin: 0,
    padding: 0
  },
  active: {
    background: theme.palette.type === "light" ? "#f4f4f4" : "#505050"
  },
  title: {
    padding: theme.spacing(2)
  },
  appBarTitle: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  appbar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  toolbar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1
  },
  avatar: {
    marginLeft: theme.spacing(2),
    backgroundColor: green[500],
    cursor: "pointer"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  userName: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  }
}));

interface Props {
  children: ReactChild;
}

const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data, loading } = useMeQuery();
  const loggedOut = !(data && data.me && String(data.me.id)) && !loading;
  if (loggedOut) return <div>{children}</div>;
  if (loading) return <CircularProgress />;

  const username = data && data.me && data.me.username ? data.me.username : "";

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const menuItems = [
    {
      text: "Datenbank",
      path: "/",
      icon: <Storage color="secondary" />
    },
    {
      text: "Benutzer",
      path: "/users",
      icon: <People color="secondary" />
    }
  ];

  const drawer = (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          Chronik
        </Typography>
      </div>

      <List>
        {menuItems.map(item => (
          <ListItem
            key={item.text}
            button
            onClick={() => history.push(item.path)}
            className={
              location.pathname === item.path ? classes.active : undefined
            }
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar elevation={1} className={classes.appbar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography className={classes.appBarTitle} variant="h5" noWrap>
            Chronik
          </Typography>
          <SearchBar />
          <div className={classes.grow} />
          <Typography className={classes.userName}>{username}</Typography>
          <Avatar
            className={classes.avatar}
            onClick={() => history.push("/profile")}
          >
            {username[0].toUpperCase()}
          </Avatar>
        </Toolbar>
      </AppBar>
      <Hidden mdUp implementation="css">
        <Drawer
          className={classes.drawer}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{ paper: classes.drawerPaper }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
      <div className={classes.page}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
