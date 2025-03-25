import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(selectUserState, (state: UserState) => state.user);
export const selectUserLoggedInData = createSelector(selectUserState, (state: UserState) => state.userLoggedInData);
export const selectUserApplicationTypes = createSelector(selectUserState, (state: UserState) => state.userApplicationTypes);
export const selectUserLoading = createSelector(selectUserState, (state: UserState) => state.loading);
export const selectUserMessage = createSelector(selectUserState, (state: UserState) => state.message);
export const selectUserSuccess = createSelector(selectUserState, (state: UserState) => state.success);
export const selectUserCode = createSelector(selectUserState, (state: UserState) => state.code);
