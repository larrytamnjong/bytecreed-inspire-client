import { createAction, props } from '@ngrx/store';
import { ServiceResponse } from 'src/app/core/Models/common/service-response';
import { Institution } from 'src/app/core/Models/identity/institution';

export const getUserInstitutionsAction = createAction('[Institution] Get User Institutions', props<{ userId: any }>());
export const getUserInstitutionsResponseAction = createAction('[Institution] Get User Institutions Response',props<{ response: ServiceResponse<Institution[]>}>());

export const loginToInstitutionAction = createAction('[Institution] Login to Institution', props<{ institutionId: any, applicationType?: number }>());
export const loginToInstitutionResponseAction = createAction('[Institution] Login to Institution Response',props<{ response: ServiceResponse<any>}>());

export const institutionErrorAction = createAction('[Institution] Error Action', props<{ error: Error }>());