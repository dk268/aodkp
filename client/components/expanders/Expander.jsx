import React from "react";
import CharacterExpander from "./CharacterExpander";

const Expander = props => {
  switch (props.modelName) {
    case "Character":
      return <CharacterExpander {...props} />;
    case "Checkpoint":
      return "checkpoint";
    case "Item":
      return "item";
    case "Raid":
      return "raid";
    default:
      return "fail";
  }
};

export default Expander;
