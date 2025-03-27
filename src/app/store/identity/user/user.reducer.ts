import { User } from "src/app/core/Models/identity/user";
import { BaseState } from "../../common/base-states";
import { createReducer } from "@ngrx/store";
import { on } from "@ngrx/store";
import * as UserActions from "./user.action";

export interface UserState extends BaseState {
    user: User | any;
    loggedInUserData: any;
    userApplicationTypes: number[] | any;
}

export const initialState: UserState = {
    user: null,
    loggedInUserData: null,
    userApplicationTypes: null,
    loading: false,
    message: null,
    success: false,
    code: null,
};

export const UserReducer = createReducer(initialState,

    on(UserActions.createUserAction, (state, {payload}) => {return{...state, loading: true, success: false, message: null,code: null, user: null }}),
    on(UserActions.createUserResponseAction, (state, {response}) => {return {...state, user: response.data, loading: false, success: response.success, message: response.message, code: response.code }}),

    on(UserActions.userLoginAction, (state, {payload}) => {return{...state, loading: true, success: false, message: null, code: null, loggedInUserData: null}}),
    on(UserActions.userLoginResponseAction, (state, {response}) => {return {...state, loggedInUserData: response.data, loading: false, success: response.success, message: response.message, code: response.code }}),

    on(UserActions.getUserApplicationTypesAction, (state, {userId, institutionId}) => {return{...state, loading: true, success: false, message: null,code: null, userApplicationTypes: null}}),
    on(UserActions.getUserApplicationTypesResponseAction, (state, {response}) => {return {...state, userApplicationTypes: response.data, loading: false, success: response.success, message: response.message, code: response.code }}),

    on(UserActions.userErrorAction, (state, {error}) => { return {...state, loading: false, success: false, message: error, user: null, userApplicationTypes: null, loggedInUserData: null }}),
);