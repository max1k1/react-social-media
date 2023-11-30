import { FormAction, stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../api/api';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './store';
const SET_AUTH_USER_DATA = 'it/auth/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
  captchaUrl: null as string | null, // if null, then captcha is not required
};
export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_CAPTCHA_URL_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
type ActionsTypes = SetAuthUserDataActionType | getCaptchaUrlSuccessActionType;
type ExtendedlActionTypes = ActionsTypes | FormAction;
type SetAuthUserDataActionPayloadType = {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};
type SetAuthUserDataActionType = {
  type: typeof SET_AUTH_USER_DATA;
  payload: SetAuthUserDataActionPayloadType;
};
export const setAuthUserData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean,
): SetAuthUserDataActionType => ({
  type: SET_AUTH_USER_DATA,
  payload: { id, email, login, isAuth },
});

type getCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: { captchaUrl: string };
};
export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ExtendedlActionTypes>;
export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const response = await authAPI.me();
  if (response.data.resultCode === 0) {
    const { id, login, email } = response.data.data;
    dispatch(setAuthUserData(id, login, email, true));
  }
};
export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string,
): ThunkType => {
  return async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }
      const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
      dispatch(stopSubmit('login', { _error: message }));
    }
  };
};
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;

  dispatch(getCaptchaUrlSuccess(captchaUrl));
};
export const logout = (): ThunkType => {
  return async (dispatch) => {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  };
};

export default authReducer;
