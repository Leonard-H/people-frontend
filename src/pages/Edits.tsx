// import React from "react";
// import Button from "@material-ui/core/Button";
// import { Add } from "@material-ui/icons";
// import { makeStyles } from "@material-ui/core";
// import { useHistory } from "react-router-dom";
// import EditTable from "../components/EditTable";
//
// const useStyles = makeStyles(theme => ({
//   registerButtonContainer: {
//     marginTop: theme.spacing(2),
//     display: "flex",
//     justifyContent: "center"
//   },
//   userPage: {
//     [theme.breakpoints.up("md")]: {
//       margin: theme.spacing(0, 3, 0, 3)
//     }
//   }
// }));
//
// interface Props {}
//
// const Edits: React.FC<Props> = () => {
//   const history = useHistory();
//   const classes = useStyles();
//   return (
//     <div className={classes.userPage}>
//       <EditTable />
//       <div className={classes.registerButtonContainer}>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Add />}
//           onClick={() => history.push("/edit")}
//         >
//           Bearbeitung Hinzufügen
//         </Button>
//       </div>
//     </div>
//   );
// };
//
// export default Edits;
