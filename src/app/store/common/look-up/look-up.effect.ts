import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as LookUpAction from "./look-up.action";
import { mergeMap, map, catchError, of, delay } from "rxjs";
import { LookUpService } from "src/app/core/services/common/look-up.service";

@Injectable()
export class LookUpEffects {
  getLookUps$ = createEffect(() =>
    this.actions$.pipe(ofType(LookUpAction.getLookUpsAction),
      mergeMap(() => this.lookUpService.getAll()
          .pipe(map((response) => LookUpAction.getLookUpsResponseAction({response})),
          catchError((error) => of(LookUpAction.lookUpErrorAction({error})))
        )
      )
    )
  );

  constructor(private actions$: Actions, private lookUpService: LookUpService) {}
}
