import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as InstitutionActions from "./institution.action";
import { InstitutionService } from "src/app/core/services/identity/institution.service";
import { mergeMap, map, catchError, of } from "rxjs";

@Injectable()
export class InstitutionEffects {

  getUserInstitutions$ = createEffect(() =>
    this.actions$.pipe(ofType(InstitutionActions.getUserInstitutionsAction),
      mergeMap(({ userId }) => this.institutionService.getUserInstitutions(userId)
          .pipe(map((response) => InstitutionActions.getUserInstitutionsResponseAction({response})),
          catchError((error) => of(InstitutionActions.institutionErrorAction({error})))
        )
      )
    )
  );

  logIntoInstitution$ = createEffect(() =>
    this.actions$.pipe(ofType(InstitutionActions.loginToInstitutionAction),
      mergeMap(({ institutionId, applicationType }) => this.institutionService.logInToInstitution(institutionId, applicationType)
          .pipe(map((response) => InstitutionActions.loginToInstitutionResponseAction({response})),
          catchError((error) => of(InstitutionActions.institutionErrorAction({error})))
        )
      )
    )
  );

  constructor(private actions$: Actions, private institutionService: InstitutionService) {}
}
