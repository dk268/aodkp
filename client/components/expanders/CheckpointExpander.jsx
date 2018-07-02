// import React from "react";
// import { Link, withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// const styles = theme => ({
//   root: {
//     display: `flex`,
//     justifyContent: `space-between`,
//     backgroundColor: `white`,
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: theme.typography.fontWeightRegular,
//   },
//   typographies: {
//     display: `flex`,
//     justifyContent: `space-around`,
//     maxWidth: `70%`,
//   },
//   bolded: {
//     fontWeight: `bold`,
//   },
// });

// const CheckpointExpander = props => {
//   const { classes, checkpoint } = props;
//   return (
//     <ExpansionPanel>
//       <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//         <div className={classes.root}>
//           <Typography
//             className={classes.heading}
//             component={Link}
//             to={`/checkpoints/${checkpoint.id}`}>
//             {checkpoint.checkpointName}
//           </Typography>
//           <Typography>Date: {checkpoint.createdAt}</Typography>}
//           <Typography>{checkpoint.checkpointDKP} dkp</Typography>
//         </div>
//       </ExpansionPanelSummary>
//       <ExpansionPanelDetails className={classes.typographies}>
//         <Typography component={Link} to={`/raids/${checkpoint.raid.id}`}>
//           {checkpoint.raid.raidName}
//         </Typography>
//         <Typography>
//           Items:{" "}
//           {checkpoint.items.map(item => {
//             return (
//               <Typography key={item.id} component={Link} to={`/items/${item.id}`}>
//                 {item.itemName}
//               </Typography>
//             );
//           })}
//         </Typography>
//       </ExpansionPanelDetails>
//     </ExpansionPanel>
//   );
// };

// CheckpointExpander.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withRouter(withStyles(styles)(CheckpointExpander));
