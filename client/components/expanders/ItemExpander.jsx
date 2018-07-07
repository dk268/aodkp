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

const ItemExpander = props => {
  const { classes, item } = props;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.grayCard}>
          <Typography className={classes.heading} component={Link} to={`/items/${item.id}`}>
            {item.itemName}
          </Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.typographies}>
        <Typography>
          Items dropped:{" "}
          {checkpoint.items.map(item => (
            <Typography
              component={Link}
              to={`/items/${item.itemId}`}
              className={classes.expanderLink}
              key={`item${item.itemId}`}>
              {item.itemName}
              {` `}
            </Typography>
          ))}
        </Typography>
        <Typography>
          Characters present:{" "}
          {checkpoint.characters.map(character => (
            <Typography
              className={classes.expanderLink}
              component={Link}
              to={`/characters/${character.characterId}`}
              key={`character${character.characterId}`}>
              {character.characterName}
              {` `}
            </Typography>
          ))}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

ItemExpander.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ItemExpander));
