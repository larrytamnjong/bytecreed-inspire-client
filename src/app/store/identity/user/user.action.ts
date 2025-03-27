import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/Models/identity/user';
import { ServiceResponse } from 'src/app/core/Models/common/service-response';
import { UserLogin } from 'src/app/core/Models/identity/user-login';
import { HttpErrorResponse } from '@angular/common/http';

export const createUserAction = createAction('[User] Create User', props<{ payload: User }>());
export const createUserResponseAction = createAction('[User] Create Response',props<{ response: ServiceResponse<User>}>());

export const userLoginAction = createAction('[User] Login', props<{ payload: UserLogin }>());
export const userLoginResponseAction = createAction('[User] Login Response', props<{ response: ServiceResponse<any> }>());

export const getUserApplicationTypesAction = createAction('[User] Get User Application Types', props<{ userId: any, institutionId: any }>());
export const getUserApplicationTypesResponseAction = createAction('[User] Get User Application Types Response', props<{ response: ServiceResponse<number[]> }>());

export const userErrorAction = createAction('[User] Error Action', props<{ error: HttpErrorResponse }>());
