import Typography from "@material-ui/core/Typography";
import {
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  List,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";

const styles = theme => ({
  blueBG: {
    width: "100%",
    backgroundColor: `lightblue`,
  },
  root: {
    maxHeight: `400px`,
    position: `relative`,
    overflow: `auto`,
    minWidth: `30%`,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  whiteCard: {
    display: `flex`,
    justifyContent: "space-between",
    backgroundColor: `white`,
    width: `100%`,
  },
  typographies: {
    display: `flex`,
    justifyContent: `space-around`,
    maxWidth: `70%`,
  },
  expanderLink: {
    color: `darkblue`,
    "&:hover": { color: `green` },
  },
});

export const SingleCharacterHeader = props => {
  const { singleCharacter } = props;
  return (
    <Paper>
      <Typography variant="display3" color="secondary">
        {singleCharacter.characterName}
      </Typography>
      <div className="margin-10-indent">
        <Typography variant="display1">{`DKP: ${singleCharacter.dkp}`}</Typography>
        <Typography variant="display1">Attendance: ~~</Typography>
        <Typography variant="display1">Class: {`${singleCharacter.class}`}</Typography>
        {singleCharacter.isAlt ? <Typography variant="title">Alt</Typography> : ""}
      </div>
    </Paper>
  );
};

export const SingleCharacterRaidsExpander = withStyles(styles)(props => {
  const { singleCharacter, classes } = props;
  const raidSet = new Set();
  const characterRaids = singleCharacter.checkpoints
    .map(checkpoint => checkpoint.raid)
    .filter(raid => {
      if (raidSet.has(raid.raidName)) return false;
      else {
        raidSet.add(raid.raidName);
        return true;
      }
    });
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.whiteCard}>
          <Typography className={`${classes.heading}`}>Raids</Typography>
        </div>{" "}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.typographies}>
        {characterRaids.map(raid => (
          <Typography
            key={raid.id}
            component={Link}
            to={`/raids/${raid.id}`}
            className={classes.expanderLink}>
            {raid.raidName}
          </Typography>
        ))}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});

export const SingleCharacterCheckpointsExpander = withStyles(styles)(props => {
  const { singleCharacter, classes } = props;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.whiteCard}>
          <Typography className={`${classes.heading}`}>Checkpoints</Typography>
        </div>{" "}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List className={classes.root}>
          {singleCharacter.checkpoints.map(checkpoint => (
            <Typography
              key={checkpoint.id}
              component={Link}
              to={`/checkpoints/${checkpoint.id}`}
              className={classes.expanderLink}>
              {checkpoint.checkpointName}
            </Typography>
          ))}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});

export const SingleCharacterDropsExpander = withStyles(styles)(props => {
  const { singleCharacter, classes } = props;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.whiteCard}>
          <Typography className={`${classes.heading}`}>Drops</Typography>
        </div>{" "}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List className={classes.root}>
          {singleCharacter.drops.map(drop => (
            <Typography key={drop.id}>
              <Link to={`/items/${drop.item.id}`} className={classes.expanderLink}>
                {drop.dropName}
              </Link>
              {` for ${drop.dropDKPCost} dkp`}
            </Typography>
          ))}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});

SingleCharacterRaidsExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};
SingleCharacterCheckpointsExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};
SingleCharacterDropsExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};
