import { BaseState } from "../../common/base-states";
import { createReducer } from "@ngrx/store";
import { Institution } from "src/app/core/Models/identity/institution";
import { on } from "@ngrx/store";
import * as InstitutionActions from './institution.action';

export interface InstitutionState extends BaseState {
    userInstitutions: Institution[] | any;
    loggedInInstitution: any;
    createdInstitution: any;
}

export const initialState: InstitutionState = {
    userInstitutions: [],
    loggedInInstitution: null,
    createdInstitution: null,
    loading: false,
    message: null,
    success: false,
    code: null,
};

export const InstitutionReducer = createReducer(initialState,

    on(InstitutionActions.getUserInstitutionsAction, (state, {userId}) => {return{...state, loading: true, success: false, message: null, code: null }}),
    on(InstitutionActions.getUserInstitutionsResponseAction, (state, {response}) => {return{...state, loading: false, success: response.success, message: response.message, code: response.code, userInstitutions: response.data }}),

    on(InstitutionActions.loginToInstitutionAction, (state, {institutionId, applicationType}) => {return {...state, loggedInInstitution: null, loading: true, success: false, message: null, code: null }}),
    on(InstitutionActions.loginToInstitutionResponseAction, (state, {response}) => {return {...state, loggedInInstitution: response.data, loading: false, success: response.success, message: response.message, code: response.code }}),

    on(InstitutionActions.createInstitutionAction, (state, {institution}) => {return{...state, loading: true, success: false, message: null, code: null }}),
    on(InstitutionActions.createInstitutionResponseAction, (state, {response}) => {return{...state, loading: false, success: response.success, message: response.message, code: response.code, createdInstitution: response.data }}),

    on(InstitutionActions.institutionErrorAction, (state, {error}) => { return {...state, loading: false, success: false, message: error.error.message, user: null }}),
);