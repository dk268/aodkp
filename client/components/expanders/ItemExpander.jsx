import React, { Fragment } from "react";
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
  console.log(props.item);
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
          Characters in possession:
          {item.characters.map(character => (
            <Typography key={`character${character.id}`}>
              <Link className={classes.expanderLink} to={`/characters/${character.id}`}>
                {" "}
                {character.characterName}{" "}
              </Link>
              {` bought for ${
                item.drops.filter(drop => drop.characterId === character.id)[0].dropDKPCost
              } dkp`}{" "}
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
