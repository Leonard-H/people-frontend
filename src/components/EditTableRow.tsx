// import React, { useState } from "react";
// import Typography from "@material-ui/core/Typography";
// import Collapse from "@material-ui/core/Collapse";
// import Box from "@material-ui/core/Box";
// import TableRow from "@material-ui/core/TableRow";
// import IconButton from "@material-ui/core/IconButton";
// import TableCell from "@material-ui/core/TableCell";
// import { makeStyles } from "@material-ui/core";
// import { KeyboardArrowUp, KeyboardArrowDown, Delete, Edit } from "@material-ui/icons";
//
// const useStyles = makeStyles(theme => ({
//   tableCell: {
//     position: "relative"
//   },
//   delete: {
//     position: "absolute",
//     top: 2,
//     right: theme.spacing(2)
//   },
//   arrow: {
//     position: "absolute",
//     top: 12,
//     left: theme.spacing(2)
//   },
//   root: {
//     "& > *": {
//       borderBottom: "unset"
//     }
//   }
// }));
//
// type Props = {
//   edit: {
//     id: string;
//     familyId: string;
//     name: string;
//   };
// };
// const EditTableRow: React.FC<Props> = ({ edit }) => {
//   const classes = useStyles();
//
//   const [open, setOpen] = useState(false);
//   return (
//     <React.Fragment>
//       <TableRow className={classes.root}>
//         <TableCell className={classes.tableCell}>
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             onClick={() => setOpen(!open)}
//             className={classes.arrow}
//           >
//             {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
//           </IconButton>
//         </TableCell>
//         <TableCell component="th" scope="row">
//           {edit.familyId}
//         </TableCell>
//         <TableCell>{edit.name}</TableCell>
//         <TableCell align="right" className={classes.tableCell}>
//           <IconButton
//             className={classes.delete}
//             onClick={() => {}}
//           >
//             <Edit />
//           </IconButton>
//         </TableCell>
//         <TableCell align="right" className={classes.tableCell}>
//           <IconButton
//             className={classes.delete}
//             onClick={() => {}}
//           >
//             <Delete />
//           </IconButton>
//         </TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box margin={1}>
//
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// };
//
// export default EditTableRow;
export {}
