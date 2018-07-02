import React from "react";
import CharacterExpander from "./CharacterExpander";
import CheckpointExpander from "./CheckpointExpander";

const Expander = props => {
  switch (props.modelName) {
    case "Character":
      return <CharacterExpander {...props} />;
    case "Checkpoint":
      return <CheckpointExpander {...props} />;
    case "Item":
      return "item";
    case "Raid":
      return "raid";
    default:
      return "fail";
  }
};

export default Expander;
