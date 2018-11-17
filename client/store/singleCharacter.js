import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aF } from ".";

const DIRECT_OBJECT = `CHARACTER`;
const LOADING_CHARACTER = `LOADING_` + DIRECT_OBJECT;
const LOADED_CHARACTER = `LOADED_` + DIRECT_OBJECT;
const ERROR_CHARACTER = `ERROR_` + DIRECT_OBJECT;
const EDIT_CHARACTER = `EDIT_CHARACTER`;

export const getSingleCharacter = id => async dispatch => {
  try {
    dispatch(aF(LOADING_CHARACTER));
    const singleCharacter = await Axios.get(`/api/characters/${id}`);
    dispatch(aF(LOADED_CHARACTER, singleCharacter.data));
    return singleCharacter.data;
  } catch (e) {
    dispatch(aF(ERROR_CHARACTER, e));
  }
};

export const editCharacter = characterData => async dispatch => {
  try {
    dispatch(aF(LOADING_CHARACTER));
    const singleCharacter = await Axios.put(
      `/api/characters/${characterData.id}`,
      characterData
    );
    dispatch(aF(EDIT_CHARACTER, singleCharacter.data));
    return singleCharacter.data;
  } catch (e) {
    dispatch(aF(ERROR_CHARACTER, e));
  }
};

const initialState = { status: UNASKED, collection: {} };

const singleCharacter = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_CHARACTER:
      return { ...state, status: LOADING };
    case LOADED_CHARACTER:
      return { ...state, status: LOADED, collection: action.payload };
    case EDIT_CHARACTER:
      return { ...state, status: LOADED, collection: action.payload };
    case ERROR_CHARACTER:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default singleCharacter;
