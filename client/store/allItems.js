import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aF } from ".";

const DIRECT_OBJECT = "ITEMS";
const LOADING_ITEMS = `LOADING_` + DIRECT_OBJECT;
const LOADED_ITEMS = `LOADED_` + DIRECT_OBJECT;
const ERROR_ITEMS = `ERROR_` + DIRECT_OBJECT;

export const getItems = () => async dispatch => {
  try {
    dispatch(aF(LOADING_ITEMS));
    const allItems = await Axios.get(`/api/items`);
    dispatch(aF(LOADED_ITEMS, allItems.data));
  } catch (e) {
    dispatch(aF(ERROR_ITEMS, e));
  }
};

const initialState = { status: UNASKED, collection: [] };

const allItems = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ITEMS:
      return { ...state, status: LOADING };
    case LOADED_ITEMS:
      return { ...state, status: LOADED, collection: action.payload };
    case ADD_ITEM:
      return {
        ...state,
        status: LOADING,
        collection: [...state.collection, action.payload],
      };
    case DELETE_ITEM:
      return {
        ...state,
        status: LOADING,
        collection: action.payload,
      };
    case ERROR_ITEMS:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default allItems;
