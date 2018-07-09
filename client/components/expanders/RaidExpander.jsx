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
  grayCard: {
    display: `flex`,
    justifyContent: "space-between",
    backgroundColor: `white`,
    width: `100%`,
  },
  expanderLink: {
    color: `darkblue`,
    "&:hover": { color: `green` },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  typographies: {
    display: `flex`,
    justifyContent: `space-around`,
    maxWidth: `70%`,
  },
  bolded: {
    fontWeight: `bold`,
  },
});

const RaidExpander = props => {
  const { classes, raid } = props;
  const nameSet = new Set();
  const raidAttendance = raid.checkpoints
    .reduce((acc, checkpoint) => acc.concat(checkpoint.characters), [])
    .filter(character => {
      if (nameSet.has(character.characterName)) return false;
      else {
        nameSet.add(character.characterName);
        return true;
      }
    })
    .sort((characterA, characterB) => {
      if (characterA.characterName < characterB.characterName) return -1;
      return 1;
    });
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.grayCard}>
          <Typography className={classes.heading} component={Link} to={`/raids/${raid.id}`}>
            {raid.raidName}
          </Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.typographies}>
        <Typography>
          Checkpoints taken:
          {raid.checkpoints.map(checkpoint => (
            <Typography
              component={Link}
              to={`/checkpoints/${checkpoint.id}`}
              className={classes.expanderLink}
              key={`checkpoint${checkpoint.id}`}>
              {checkpoint.checkpointName}
              {` `}
            </Typography>
          ))}
        </Typography>
        <Typography>
          Raid drops:{" "}
          {raid.checkpoints
            .reduce((acc, checkpoint) => acc.concat(checkpoint.drops), [])
            .map(drop => (
              <Typography
                component={Link}
                to={`/items/${drop.itemId}`}
                className={classes.expanderLink}
                key={`raidItem${drop.id}`}>
                {`${drop.dropName} to ${drop.character.characterName} for ${drop.dropDKPCost} DKP`}
              </Typography>
            ))}
        </Typography>
        <Typography>
          Characters present:{" "}
          {raidAttendance.map(character => (
            <Typography
              className={classes.expanderLink}
              component={Link}
              to={`/characters/${character.id}`}
              key={`character${character.id}`}>
              {character.characterName}
              {` `}
            </Typography>
          ))}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

RaidExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(RaidExpander));
