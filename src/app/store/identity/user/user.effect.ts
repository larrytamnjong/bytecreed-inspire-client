import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UserActions from "./user.action";
import { UserService } from "src/app/core/services/identity/user.service";
import { mergeMap, map, catchError, of, delay } from "rxjs";

@Injectable()
export class UserEffects {

  createUser$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActions.createUserAction),
      mergeMap(({ payload }) => this.userService.registerUser(payload)
          .pipe(map((response) => UserActions.createUserResponseAction({response})),
          catchError((error) => of(UserActions.userErrorAction({error})))
        )
      )
    )
  );

  userLogin$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActions.userLoginAction),
      mergeMap(({ payload }) => this.userService.loginUser(payload)
          .pipe(map((response) => UserActions.userLoginResponseAction({response})),
          catchError((error) => of(UserActions.userErrorAction({error})))
        )
      )
    )
  );

  getUserApplicationTypes$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActions.getUserApplicationTypesAction),
      mergeMap(({ userId, institutionId }) => this.userService.getUserApplicationTypes(userId, institutionId)
          .pipe(map((response) => UserActions.createUserResponseAction({response})),
          catchError((error) => of(UserActions.userErrorAction({error})))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
