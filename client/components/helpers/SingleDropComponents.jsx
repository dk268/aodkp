import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import React from "react";

const styles = theme => ({
  expanderLink: {
    color: `darkblue`,
    "&:hover": { color: `green` },
  },
});

export const SingleDropHeader = withStyles(styles)(props => {
  const { singleDrop, classes } = props;
  return (
    <Paper>
      <Typography variant="display3" color="textSecondary">
        {singleDrop.dropName}
      </Typography>
      <div className="margin-10-indent">
        <Typography
          className={classes.expanderLink}
          component={Link}
          to={`/items/${singleDrop.item.id}`}
          variant="display1">
          {singleDrop.item.itemName}
        </Typography>
        <Typography variant="display1">
          Buyer:{" "}
          <Link to={`/characters/${singleDrop.character.id}`} className={classes.expanderLink}>
            {singleDrop.character.characterName}
          </Link>
        </Typography>
        <Typography variant="display1">{`for ${singleDrop.dropDKP} DKP`}</Typography>
        <Typography variant="display1">
          {`at raid `}
          <Link className={classes.expanderLink} to={`/raids/${singleDrop.checkpoint.raid.id}`}>
            {singleDrop.checkpoint.raid.raidName}
          </Link>
        </Typography>
      </div>
    </Paper>
  );
});

SingleDropHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};
