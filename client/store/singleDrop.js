import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aF } from ".";

const DIRECT_OBJECT = `DROP`;
const LOADING_DROP = `LOADING_` + DIRECT_OBJECT;
const LOADED_DROP = `LOADED_` + DIRECT_OBJECT;
const ERROR_DROP = `ERROR_` + DIRECT_OBJECT;
const EDIT_DROP = `EDIT_CHARACTER`;

export const getSingleDrop = id => async dispatch => {
  try {
    dispatch(aF(LOADING_DROP));
    const singleDrop = await Axios.get(`/api/drops/${id}`);
    dispatch(aF(LOADED_DROP, singleDrop.data));
    return singleDrop.data;
  } catch (e) {
    dispatch(aF(ERROR_DROP, e));
  }
};

const initialState = { status: UNASKED, collection: {} };

const singleDrop = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DROP:
      return { ...state, status: LOADING };
    case LOADED_DROP:
      return { ...state, status: LOADED, collection: action.payload };
    case EDIT_DROP:
      return { ...state, status: LOADED, collection: action.payload };
    case ERROR_DROP:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default singleDrop;
