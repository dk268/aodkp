import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

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
    maxWidth: `70%`,
  },
  expanderLink: {
    color: `darkblue`,
    "&:hover": { color: `green` },
  },
  bolded: {
    fontWeight: `bold`,
  },
});

const CharacterExpander = props => {
  const { classes, character, totalCheckpoints } = props;
  let characterCheckpoints = 0;
  // console.log("character . checkpoints", character.checkpoints);
  // console.log(totalCheckpoints);
  if (character.checkpoints.length) {
    characterCheckpoints = character.checkpoints.filter(checkpoint => {
      let milliseconds;
      if (checkpoint.raid && checkpoint.raid.raidDate) {
        milliseconds = new Date(checkpoint.raid.raidDate).getTime();
        return Date.now() - milliseconds < 3622000000;
      }
      return false;
    }).length;
  }
  console.log(characterCheckpoints, characterCheckpoints / totalCheckpoints);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.whiteCard}>
          <Typography
            className={`${classes.heading} ${classes.expanderLink}`}
            component={Link}
            to={`/characters/${character.id}`}>
            {character.characterName}
          </Typography>
          <Typography>{character.dkp} dkp</Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.typographies}>
        <Typography>
          {characterCheckpoints / totalCheckpoints
            ? Math.floor(characterCheckpoints * 10000 / totalCheckpoints) / 100 + `%`
            : `unavailable`}
        </Typography>
        <Typography>class: {character.class ? character.class : `not specified`}</Typography>
        <Typography>DKP spent: {character.totalDKPSpent}</Typography>
        <Typography>DKP earned: {character.totalDKPEarned}</Typography>
        <Typography className={classes.bolded}>{!character.isAlt ? `Main` : `Alt`}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

CharacterExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(CharacterExpander));
