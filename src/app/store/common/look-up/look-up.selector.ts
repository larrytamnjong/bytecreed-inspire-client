import { createFeatureSelector, createSelector } from "@ngrx/store";
import  { LookUpState } from "./look-up.reducer";

export const selectLookUpState = createFeatureSelector<LookUpState>('lookUp');

export const selectLookUpsView = createSelector(selectLookUpState, (state: LookUpState) => state.lookUpsView);
export const selectLoading = createSelector(selectLookUpState, (state: LookUpState) => state.loading);
export const selectMessage = createSelector(selectLookUpState, (state: LookUpState) => state.message);
export const selectSuccess = createSelector(selectLookUpState, (state: LookUpState) => state.success);
export const selectCode = createSelector(selectLookUpState, (state: LookUpState) => state.code);