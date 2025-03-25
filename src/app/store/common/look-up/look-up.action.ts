import { createAction, props } from '@ngrx/store';
import { LookUpView } from 'src/app/core/Models/common/look-up-view';

export const getLookUpsAction = createAction('[LookUp] Get LookUp');
export const getLookUpsResponseAction = createAction('[LookUp] Get LookUp Response',props<{ response: LookUpView}>());

export const lookUpErrorAction = createAction('[LookUp] Error Action', props<{ error: Error }>());