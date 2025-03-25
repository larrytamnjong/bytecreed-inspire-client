import { BaseState } from "../../common/base-states";
import { createReducer } from "@ngrx/store";
import { Institution } from "src/app/core/Models/identity/institution";
import { on } from "@ngrx/store";
import * as InstitutionActions from './institution.action';

export interface InstitutionState extends BaseState {
    userInstitutions: Institution[] | any;
    loggedInToInstitutionData: any;
}

export const initialState: InstitutionState = {
    userInstitutions: null,
    loggedInToInstitutionData: null,
    loading: false,
    message: null,
    success: false,
    code: null,
};

export const InstitutionReducer = createReducer(initialState,

    on(InstitutionActions.getUserInstitutionsAction, (state, {userId}) => {return{...state, loading: true, success: false, message: null, code: null, userInstitutions: null }}),
    on(InstitutionActions.getUserInstitutionsResponseAction, (state, {response}) => {return{...state, loading: false, success: response.success, message: response.message, code: response.code, userInstitutions: response.data }}),

    on(InstitutionActions.loginToInstitutionAction, (state, {institutionId, applicationType}) => {return {...state, loggedInToInstitutionData: null, loading: true, success: false, message: null, code: null }}),
    on(InstitutionActions.loginToInstitutionResponseAction, (state, {response}) => {return {...state, loggedInToInstitutionData: response.data, loading: false, success: response.success, message: response.message, code: response.code }}),

    on(InstitutionActions.institutionErrorAction, (state, {error}) => { return {...state, loading: false, success: false, message: error, user: null }}),
);