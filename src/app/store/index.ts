import { ActionReducerMap } from "@ngrx/store";
import { LayoutState, layoutReducer } from "./layouts/layout-reducers";
import { UserReducer, UserState } from "./identity/user/user.reducer";
import { InstitutionReducer } from "./identity/institution/institution.reducer";
import { LookUpReducer, LookUpState } from "./common/look-up/look-up.reducer";
import { InstitutionState } from "./identity/institution/institution.reducer";

export interface RootReducerState {
    layout: LayoutState;
    user: UserState
    lookUp: LookUpState,
    institution: InstitutionState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    layout: layoutReducer,
    user: UserReducer,
    lookUp: LookUpReducer,
    institution: InstitutionReducer
}