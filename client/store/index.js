import { createStore, combineReducers, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import allCharacters from "./allCharacters.js";
import allItems from "./allItems.js";
import allRaids from "./allRaids.js";
import singleCharacter from "./singleCharacter.js";
import singleItem from "./singleItem.js";
import singleRaid from "./singleRaid.js";
import allCheckpoints from "./allCheckpoints.js";
import singleCheckpoint from "./singleCheckpoint.js";
import auth from "./auth.js";
import Axios from "axios";
import allDrops from "./allDrops";
import singleDrop from "./singleDrop";

export const [UNASKED, LOADING, LOADED, ERROR] = [`UNASKED`, `LOADING`, `LOADED`, `ERROR`];

const initialState = UNASKED;

const globalStatus = (state = initialState, action) => {
  switch (action.type) {
    case UNASKED:
      return UNASKED;
    case LOADING:
      return LOADING;
    case LOADED:
      return LOADED;
    case ERROR:
      return ERROR;
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  allCharacters,
  allDrops,
  allItems,
  allRaids,
  allCheckpoints,
  auth,
  user,
  singleCharacter,
  singleDrop,
  singleItem,
  singleRaid,
  singleCheckpoint,
  globalStatus,
});

export const aF = (type, payload) => ({ type, payload });

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(rootReducer, middleware);

export default store;
export * from "./user";
