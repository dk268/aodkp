import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aF } from ".";

const DIRECT_OBJECT = `DROPS`;
const LOADING_DROPS = `LOADING_` + DIRECT_OBJECT;
const LOADED_DROPS = `LOADED_` + DIRECT_OBJECT;
const ERROR_DROPS = `ERROR_` + DIRECT_OBJECT;
const ADD_DROP = `ADD_DROP`;
const DELETE_DROP = `DELETE_DROP`;

export const getDrops = () => async dispatch => {
  try {
    dispatch(aF(LOADING_DROPS));
    const allDrops = await Axios.get(`/api/drops`);
    dispatch(aF(LOADED_DROPS, allDrops.data));
    return allDrops.data;
  } catch (e) {
    dispatch(aF(ERROR_DROPS, e));
  }
};

const initialState = { status: UNASKED, collection: [] };

const allDrops = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DROPS:
      return { ...state, status: LOADING };
    case LOADED_DROPS:
      return { ...state, status: LOADED, collection: action.payload };
    case ADD_DROP:
      return {
        ...state,
        status: LOADING,
        collection: [...state.collection, action.payload],
      };
    case DELETE_DROP:
      return {
        ...state,
        status: LOADING,
        collection: action.payload,
      };
    case ERROR_DROPS:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default allDrops;
