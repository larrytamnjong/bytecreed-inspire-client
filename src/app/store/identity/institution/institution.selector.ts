import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InstitutionState } from "./institution.reducer";

export const selectInstitutionState = createFeatureSelector<InstitutionState>('institution');

export const selectUserInstitutions = createSelector(selectInstitutionState, (state: InstitutionState) => state.userInstitutions);
export const selectLoggedInInstitution = createSelector(selectInstitutionState, (state: InstitutionState) => state.loggedInInstitution);
export const selectInstitutionLoading = createSelector(selectInstitutionState, (state: InstitutionState) => state.loading);
export const selectInstitutionMessage = createSelector(selectInstitutionState, (state: InstitutionState) => state.message);
export const selectInstitutionSuccess = createSelector(selectInstitutionState, (state: InstitutionState) => state.success);
export const selectInstitutionCode = createSelector(selectInstitutionState, (state: InstitutionState) => state.code);
