import { createAction, props } from '@ngrx/store';
import { ServiceResponse } from 'src/app/core/Models/common/service-response';
import { Institution } from 'src/app/core/Models/identity/institution';

export const getUserInstitutionsAction = createAction('[Institution] Get User Institutions', props<{ userId: any }>());
export const getUserInstitutionsResponseAction = createAction('[Institution] Get User Institutions Response',props<{ response: ServiceResponse<Institution[]>}>());

export const loginToInstitutionAction = createAction('[Institution] Log In To Institution', props<{ institutionId: any, applicationType?: number }>());
export const loginToInstitutionResponseAction = createAction('[Institution] Log In To Institution Response',props<{ response: ServiceResponse<any>}>());

export const institutionErrorAction = createAction('[User] Error Action', props<{ error: Error }>());