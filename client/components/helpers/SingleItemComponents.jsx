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

export const SingleItemHeader = props => {
  const { singleItem } = props;
  return (
    <Paper>
      <Typography variant="display3" color="default">
        {singleItem.itemName}
      </Typography>
    </Paper>
  );
};

export const SingleItemRaidsExpander = withStyles(styles)(props => {
  const { singleItem, classes } = props;
  const raidSet = new Set();
  const itemRaids = singleItem.drops
    .reduce((acc, drop) => acc.concat(drop.checkpoint), [])
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
          <Typography className={`${classes.heading}`}>Raids with this item</Typography>
        </div>{" "}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.typographies}>
        {itemRaids.map(raid => (
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

export const SingleItemCheckpointsExpander = withStyles(styles)(props => {
  const { singleItem, classes } = props;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.whiteCard}>
          <Typography className={`${classes.heading}`}>Checkpoints with this item</Typography>
        </div>{" "}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List className={classes.root}>
          {singleItem.drops.filter(drop => drop.itemId === singleItem.id).map(drop => (
            <Typography key={drop.id}>
              <Link to={`/checkpoints/${drop.checkpoint.id}`} className={classes.expanderLink}>
                {drop.checkpoint.checkpointName}
              </Link>
              {` of raid: `}
              <Link to={`/raids/${drop.checkpoint.raid.id}`} className={classes.expanderLink}>
                {drop.checkpoint.raid.raidName}
              </Link>
            </Typography>
          ))}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});

export const SingleItemDropsExpander = withStyles(styles)(props => {
  const { singleItem, classes } = props;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.whiteCard}>
          <Typography className={`${classes.heading}`}>Drops of this item</Typography>
        </div>{" "}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List className={classes.root}>
          {singleItem.drops.map(drop => (
            <Typography key={drop.id}>
              <Link to={`/drops/${drop.id}`} className={classes.expanderLink}>
                {drop.dropName}
              </Link>
              {` to `}{" "}
              <Link to={`/characters/${drop.characterId}`} className={classes.expanderLink}>
                {drop.character.characterName}
              </Link>
              {` in raid: `}
              <Link to={`/raids/${drop.checkpoint.raid.id}`} className={classes.expanderLink}>
                {drop.checkpoint.raid.raidName}
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

export const SingleItemCharactersExpander = withStyles(styles)(props => {
  const { singleItem, classes } = props;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.whiteCard}>
          <Typography className={`${classes.heading}`}>Characters with this item</Typography>
        </div>{" "}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List className={classes.root}>
          {singleItem.characters.map(character => (
            <Typography key={character.id}>
              <Link to={`/characters/${character.id}`} className={classes.expanderLink}>
                {character.characterName}
              </Link>
              {` in raid: `}
              <Link
                to={`/raids/${
                  singleItem.drops.filter(drop => drop.characterId === character.id)[0].checkpoint
                    .raid.id
                }`}
                className={classes.expanderLink}>
                {
                  singleItem.drops.filter(drop => drop.characterId === character.id)[0].checkpoint
                    .raid.raidName
                }
              </Link>
              {` at checkpoint `}
              <Link
                to={`/checkpoints/${
                  singleItem.drops.filter(drop => drop.characterId === character.id)[0].checkpoint
                    .id
                }`}
                className={classes.expanderLink}>
                {
                  singleItem.drops.filter(drop => drop.characterId === character.id)[0].checkpoint
                    .checkpointName
                }
              </Link>
              {` for ${
                singleItem.drops.filter(drop => drop.characterId === character.id)[0].dropDKPCost
              } dkp`}
            </Typography>
          ))}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});

SingleItemRaidsExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};
SingleItemCheckpointsExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};
SingleItemDropsExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};
SingleItemCharactersExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};
