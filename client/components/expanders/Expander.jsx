import React from "react";
import CharacterExpander from "./CharacterExpander";
import CheckpointExpander from "./CheckpointExpander";
import ItemExpander from "./ItemExpander";

const Expander = props => {
  switch (props.modelName) {
    case "Character":
      return <CharacterExpander {...props} />;
    case "Checkpoint":
      return <CheckpointExpander {...props} />;
    case "Item":
      return <ItemExpander {...props} />;
    case "Raid":
      return "raid";
    default:
      return "fail";
  }
};

export default Expander;
