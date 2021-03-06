'use strict';

export enum authActionTypes {
	LOGIN_REQUEST = 'LOGIN_REQUEST',
	LOGIN_SUCCESS = 'LOGIN_SUCCESS',
	LOGIN_FAILURE = 'LOGIN_FAILURE',
	LOGOUT = 'LOGOUT',

	GET_USER = 'GET_USER',
	GET_USER_SUCCESS = 'GET_USER_SUCCESS',

	FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST',
	FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS',
	FORGOT_PASSWORD_LOGIN_MESSAGE = 'FORGOT_PASSWORD_LOGIN_MESSAGE',

	SIGN_UP_REQUEST = 'SIGN_UP_REQUEST',
	SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
	SIGN_UP_FAILURE = 'SIGN_UP_FAILURE',

	RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST',
	RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE',

	RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE',

	USER_PROFILE_REQUEST = 'USER_PROFILE_REQUEST',
	USER_PROFILE_SUCCESS = 'USER_PROFILE_SUCCESS',
	USER_PROFILE_FAILURE = 'USER_PROFILE_FAILURE',

	DELETE_USER_REQUEST = 'DELETE_USER_REQUEST'
}
