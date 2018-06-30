import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aF } from ".";

const DIRECT_OBJECT = "RAIDS";
const LOADING_RAIDS = `LOADING_` + DIRECT_OBJECT;
const LOADED_RAIDS = `LOADED_` + DIRECT_OBJECT;
const ERROR_RAIDS = `ERROR_` + DIRECT_OBJECT;

export const getRaids = () => async dispatch => {
  try {
    dispatch(aF(LOADING_RAIDS));
    const allRaids = await Axios.get(`/api/raids`);
    dispatch(aF(LOADED_RAIDS, allRaids.data));
  } catch (e) {
    dispatch(aF(ERROR_RAIDS, e));
  }
};

const initialState = { status: UNASKED, collection: [] };

const allRaids = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_RAIDS:
      return { ...state, status: LOADING };
    case LOADED_RAIDS:
      return { ...state, status: LOADED, collection: action.payload };
    case ADD_RAID:
      return {
        ...state,
        status: LOADING,
        collection: [...state.collection, action.payload],
      };
    case DELETE_RAID:
      return {
        ...state,
        status: LOADING,
        collection: action.payload,
      };
    case ERROR_RAIDS:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default allRaids;
