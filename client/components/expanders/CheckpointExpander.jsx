import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { List } from "@material-ui/core";

const styles = theme => ({
  root: {
    maxHeight: `250px`,
    position: `relative`,
    overflow: `auto`,
    minWidth: `30%`,
  },
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
    maxWidth: `90%`,
  },
  bolded: {
    fontWeight: `bold`,
  },
});

const CheckpointExpander = props => {
  const { classes, checkpoint } = props;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.grayCard}>
          <Typography
            className={classes.heading}
            component={Link}
            to={`/checkpoints/${checkpoint.id}`}>
            {checkpoint.checkpointName}
          </Typography>
          <Typography>{checkpoint.raid.raidName}</Typography>
          <Typography>Adds {checkpoint.checkpointDKP} dkp</Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.typographies}>
        <Typography>
          Items dropped:{" "}
          {checkpoint.drops.map(drop => (
            <Typography
              component={Link}
              to={`/drops/${drop.id}`}
              className={classes.expanderLink}
              key={`drop${drop.id}`}>
              {drop.dropName}
              {` `}
            </Typography>
          ))}
        </Typography>
        <List className={classes.root}>
          <Typography>
            Characters present:{" "}
            {checkpoint.characters.map(character => (
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
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

CheckpointExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(CheckpointExpander));
