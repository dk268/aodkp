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

export const SingleCheckpointHeader = props => {
  const { singleCheckpoint } = props;
  return (
    <Paper>
      <Typography variant="display3" color="textSecondary">
        {singleCheckpoint.checkpointName}
      </Typography>
      <div className="margin-10-indent">
        <Typography variant="display1">{`DKP: ${singleCheckpoint.checkpointDKP}`}</Typography>
        <Typography variant="display1">
          Raid:{" "}
          <Link to={`/raids/${singleCheckpoint.raid.id}`} className={classes.expanderLink}>
            {singleCheckpoint.raid.raidName}
          </Link>
        </Typography>
      </div>
    </Paper>
  );
};

export const SingleCheckpointCharactersExpander = withStyles(styles)(props => {
  const { singleCheckpoint, classes } = props;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.whiteCard}>
          <Typography className={`${classes.heading}`}>Characters</Typography>
        </div>{" "}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List className={classes.root}>
          {singleCheckpoint.characters.map(character => (
            <Typography
              key={character.id}
              component={Link}
              to={`/characters/${character.id}`}
              className={classes.expanderLink}>
              {character.characterName}
            </Typography>
          ))}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});

export const SingleCheckpointDropsExpander = withStyles(styles)(props => {
  const { singleCheckpoint, classes } = props;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.whiteCard}>
          <Typography className={`${classes.heading}`}>Drops</Typography>
        </div>{" "}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List className={classes.root}>
          {singleCheckpoint.drops.map(drop => (
            <Typography key={drop.id}>
              <Link to={`/items/${drop.item.id}`} className={classes.expanderLink}>
                {drop.dropName}
              </Link>
              {` to `}{" "}
              <Link to={`/characters/${drop.character.id}`} className={classes.expanderLink}>
                {drop.character.characterName}
              </Link>
              {` for ${drop.dropDKPCost} dkp`}
            </Typography>
          ))}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});

SingleCheckpointCheckpointsExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};
SingleCheckpointDropsExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};
