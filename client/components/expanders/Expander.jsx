import React from "react";
import CharacterExpander from "./CharacterExpander";
import CheckpointExpander from "./CheckpointExpander";
import ItemExpander from "./ItemExpander";
import RaidExpander from "./RaidExpander";
import DropExpander from "./DropExpander";

const Expander = props => {
  switch (props.modelName) {
    case "Character":
      return <CharacterExpander {...props} />;
    case "Checkpoint":
      return <CheckpointExpander {...props} />;
    case "Drop":
      return <DropExpander {...props} />;
    case "Item":
      return <ItemExpander {...props} />;
    case "Raid":
      return <RaidExpander {...props} />;
    default:
      return "fail";
  }
};

export default Expander;
