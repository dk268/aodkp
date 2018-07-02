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
  const { classes, character } = props;
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
        <Typography>Attendance: 200%</Typography>
        <Typography>class: {character.class}</Typography>
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
