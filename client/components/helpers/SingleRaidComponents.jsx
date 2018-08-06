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

export const SingleRaidHeader = props => {
  const { singleRaid } = props;
  return (
    <Paper>
      <Typography variant="display3" color="default">
        {singleRaid.raidName}
      </Typography>
    </Paper>
  );
};

export const SingleRaidCharactersExpander = withStyles(styles)(props => {
  const { singleRaid, classes } = props;
  const characterSet = new Set();
  const raidCharacters = singleRaid.checkpoints
    .reduce((acc, checkpoint) => acc.concat(checkpoint.characters), [])
    .filter(character => {
      if (characterSet.has(character.characterName)) return false;
      else {
        characterSet.add(character.characterName);
        return true;
      }
    });
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.whiteCard}>
          <Typography className={`${classes.heading}`}>Characters in this raid</Typography>
        </div>{" "}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.typographies}>
        <List className={classes.root}>
          {raidCharacters.map(character => (
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

export const SingleRaidCheckpointsExpander = withStyles(styles)(props => {
  const { singleRaid, classes } = props;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.whiteCard}>
          <Typography className={`${classes.heading}`}>Checkpoints in this raid</Typography>
        </div>{" "}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {singleRaid.checkpoints.map(checkpoint => (
          <Typography
            key={checkpoint.id}
            component={Link}
            to={`/checkpoints/${checkpoint.id}`}
            className={classes.expanderLink}>
            {checkpoint.checkpointName}
          </Typography>
        ))}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});

export const SingleRaidDropsExpander = withStyles(styles)(props => {
  const { singleRaid, classes } = props;
  const dropSet = new Set();
  const raidDrops = singleRaid.checkpoints
    .reduce((acc, checkpoint) => acc.concat(checkpoint.drops), [])
    .filter(drop => {
      if (dropSet.has(drop.dropName)) return false;
      else {
        dropSet.add(drop.dropName);
        return true;
      }
    });
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.whiteCard}>
          <Typography className={`${classes.heading}`}>Drops of this raid</Typography>
        </div>{" "}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List className={classes.root}>
          {raidDrops.map(drop => (
            <Typography key={drop.id}>
              <Link to={`/drops/${drop.id}`} className={classes.expanderLink}>
                {drop.dropName}
              </Link>
              {` to `}{" "}
              <Link to={`/characters/${drop.characterId}`} className={classes.expanderLink}>
                {drop.character.characterName}
              </Link>
              {` at checkpoint `}
              <Link to={`/checkpoints/${drop.checkpoint.id}`} className={classes.expanderLink}>
                {drop.checkpoint.checkpointName}
              </Link>
              {` for ${drop.dropDKPCost} dkp`}
            </Typography>
          ))}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});

SingleRaidCheckpointsExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};
SingleRaidDropsExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};
SingleRaidCharactersExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};
