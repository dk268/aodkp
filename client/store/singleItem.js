import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aF } from ".";

const DIRECT_OBJECT = "ITEM";
const LOADING_ITEM = `LOADING_` + DIRECT_OBJECT;
const LOADED_ITEM = `LOADED_` + DIRECT_OBJECT;
const ERROR_ITEM = `ERROR_` + DIRECT_OBJECT;

export const getSingleItem = id => async dispatch => {
  try {
    dispatch(aF(LOADING_ITEM));
    const singleItem = await Axios.get(`/api/items/${id}`);
    dispatch(aF(LOADED_ITEM, singleItem.data));
  } catch (e) {
    dispatch(aF(ERROR_ITEM, e));
  }
};

const initialState = { status: UNASKED, collection: {} };

const singleItem = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ITEM:
      return { ...state, status: LOADING };
    case LOADED_ITEM:
      return { ...state, status: LOADED, collection: action.payload };
    case EDIT_ITEM:
      return { ...state, status: LOADED, collection: action.payload };
    case ERROR_ITEM:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default singleItem;
