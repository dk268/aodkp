import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aF } from ".";

const DIRECT_OBJECT = "RAID";
const LOADING_RAID = `LOADING_` + DIRECT_OBJECT;
const LOADED_RAID = `LOADED_` + DIRECT_OBJECT;
const ERROR_RAID = `ERROR_` + DIRECT_OBJECT;

export const getSingleRaid = id => async dispatch => {
  try {
    dispatch(aF(LOADING_RAID));
    const singleRaid = await Axios.get(`/api/raids/${id}`);
    dispatch(aF(LOADED_RAID, singleRaid.data));
  } catch (e) {
    dispatch(aF(ERROR_RAID, e));
  }
};

const initialState = { status: UNASKED, collection: {} };

const singleRaid = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_RAID:
      return { ...state, status: LOADING };
    case LOADED_RAID:
      return { ...state, status: LOADED, collection: action.payload };
    case EDIT_RAID:
      return { ...state, status: LOADED, collection: action.payload };
    case ERROR_RAID:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default singleRaid;
