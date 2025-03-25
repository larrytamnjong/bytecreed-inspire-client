import { User } from "src/app/core/Models/identity/user";
import { BaseState } from "../../common/base-states";
import { createReducer } from "@ngrx/store";
import { on } from "@ngrx/store";
import { LookUpView } from "src/app/core/Models/common/look-up-view";
import * as LookUpAction from "./look-up.action";

export interface LookUpState extends BaseState {
    lookUpsView: LookUpView | any;
}

export const initialState: LookUpState = {
    lookUpsView: null,
    loading: false,
    message: null,
    success: false,
    code: null,
};

export const LookUpReducer = createReducer(initialState,
    on(LookUpAction.getLookUpsAction, (state) => {return{...state, loading: true, success: false, message: null,code: null, lookUpsView: null}}),
    on(LookUpAction.getLookUpsResponseAction, (state, {response}) => {return {...state, lookUpsView: response, loading: false, success: true, }}),
    on(LookUpAction.lookUpErrorAction, (state, {error}) => { return {...state, loading: false, success: false, message: error, user: null }}),
);