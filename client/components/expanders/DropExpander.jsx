import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  whiteCard: {
    display: `flex`,
    justifyContent: "space-between",
    backgroundColor: `white`,
    width: `100%`,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  typographies: {
    display: `flex`,
    justifyContent: `space-around`,
    maxWidth: `90%`,
  },
  expanderLink: {
    color: `darkblue`,
    "&:hover": { color: `green` },
  },
  bolded: {
    fontWeight: `bold`,
  },
});

const DropExpander = props => {
  const { classes, drop } = props;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.whiteCard}>
          <Typography
            className={`${classes.heading} ${classes.expanderLink}`}
            component={Link}
            to={`/items/${drop.itemId}`}>
            {drop.dropName}
          </Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.typographies}>
        <Typography>
          Character awarded:{" "}
          <Link className={classes.expanderLink} to={`/characters/${drop.associatedCharacter.id}`}>
            {" "}
            {drop.associatedCharacter.characterName}{" "}
          </Link>
        </Typography>
        <Typography>DKP cost: {drop.dropDKPCost}</Typography>
        <Typography>
          Raid acquired:{" "}
          <Link className={classes.expanderLink} to={`/raids/${drop.checkpoint.raid.id}`}>
            {" "}
            {drop.checkpoint.raid.raidName}{" "}
          </Link>
        </Typography>
        <Typography>
          {" "}
          Specific drop:{" "}
          <Link className={classes.expanderLink} to={`/drops/${drop.id}`}>
            (link)
          </Link>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

DropExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(DropExpander));
