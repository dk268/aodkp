import Axios from "axios";
import { LOADING, LOADED, ERROR, UNASKED, aF } from ".";

const DIRECT_OBJECT = "AUTH";
const LOADING_AUTH = "LOADING_" + DIRECT_OBJECT;
const NO_LOGIN_AUTH = "NO_LOGIN_" + DIRECT_OBJECT;
const LOGGED_IN_AUTH = "LOGGED_IN_" + DIRECT_OBJECT;
const ADMIN_AUTH = "ADMIN_" + DIRECT_OBJECT;
const ERROR_AUTH = `ERROR_` + DIRECT_OBJECT;

export const login = (userInfo, route) => async dispatch => {
  try {
    dispatch(aF(LOADING_AUTH));
    const currentUser = await Axios.post(`/users/${route}`, userInfo);
    console.log(currentUser.data);
    switch (currentUser.data.isAdmin) {
      case true:
        dispatch(aF(ADMIN_AUTH), currentUser.data);
      case false:
        dispatch(aF(LOGGED_IN_AUTH), currentUser.data);
      default:
        dispatch(aF(NO_LOGIN_AUTH));
    }
  } catch (e) {
    dispatch(aF(ERROR_CHARACTER, e));
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch(aF(LOADING_AUTH));
    await Axios.post(`/users/logout`);
    dispatch(aF(NO_LOGIN_AUTH));
  } catch (e) {
    console.log(e);
  }
};

export const me = () => async dispatch => {
  try {
    dispatch(aF(LOADING_AUTH));
    const currentUser = await Axios.get("/users/me");
    currentUser.data
      ? dispatch(aF(LOGGED_IN_AUTH, currentUser.data))
      : dispatch(aF(NO_LOGIN_AUTH));
    if (currentUser.data.isAdmin) dispatch(aF(ADMIN_AUTH, currentUser.data));
  } catch (e) {
    dispatch(aF(ERROR_AUTH, e));
  }
};

const initialState = { status: NO_LOGIN_AUTH, collection: {}, error: {} };

const auth = (state = initialState, action) => {
  switch (action.type) {
    case NO_LOGIN_AUTH:
      return { ...state, status: NO_LOGIN_AUTH };
    case LOGGED_IN_AUTH:
      return { ...state, status: LOGGED_IN_AUTH, collection: action.payload };
    case ADMIN_AUTH:
      return { ...state, status: ADMIN_AUTH, collection: action.payload };
    case ERROR_AUTH:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default auth;
