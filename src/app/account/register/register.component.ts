import { Component, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup,Validators} from "@angular/forms";
import { passwordMatchValidator } from "src/app/core/helpers/validators";
import { Router } from "@angular/router";
import { LookUpView } from "src/app/core/Models/common/look-up-view";
import { SimpleAlerts } from "src/app/core/services/notifications/sweet-alerts";
import { LookUpData } from "src/app/core/Models/common/look-up-data";
import { LookUpTableEnum } from "src/app/core/enums/look-up-table";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { RootReducerState } from "src/app/store";
import { createUserAction } from "src/app/store/identity/user/user.action";
import { User } from "src/app/core/Models/identity/user";
import { selectUserLoading, selectUserMessage, selectUserSuccess } from "src/app/store/identity/user/user.selector";
import { selectLookUpsView } from "src/app/store/common/look-up/look-up.selector";
import { getLookUpsAction } from "src/app/store/common/look-up/look-up.action";
import { Subscription } from "rxjs";
import { countriesData } from "src/app/core/data/countries";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
 
   public countriesData = countriesData;

  loading$: Observable<boolean> = this.store.select(selectUserLoading);
  success$: Observable<boolean> = this.store.select(selectUserSuccess);
  message$: Observable<any> = this.store.select(selectUserMessage);
  message: any;

  signupForm!: UntypedFormGroup;
  submitted = false;

  year: number = new Date().getFullYear();

  lookUps?: LookUpView;
  sexOptions: LookUpData[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private store: Store<{ data: RootReducerState }>
  ) {}

  ngOnInit(): void {
    this.getLookUps();

    this.signupForm = this.formBuilder.group({
        phone: ["", [Validators.required]],
        familyName: ["", [Validators.required]],
        givenNames: ["", Validators.required],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
        sex: ["", Validators.required],
      },
      { validators: [passwordMatchValidator() ]} 
    );

    const messageSubscription = this.message$.subscribe((message) => {this.message = message;});
    this.subscriptions.push(messageSubscription);
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    const user = {
      phone: this.f["phone"].value,
      familyName: this.f["familyName"].value,
      givenNames: this.f["givenNames"].value,
      password: this.f["password"].value,
      sex: Number(this.f["sex"].value),
    };

    this.registerUser(user);
  }

  registerUser(user: User) {
    this.store.dispatch(createUserAction({ payload: user }));
    const loadingSubscription = this.loading$.subscribe((loading) => {
      if (!loading) {
        const successSubscription =   this.success$.subscribe((success) => {
          if (success) {
            SimpleAlerts.showSuccess();
            this.router.navigate(["/auth/login"]);
          } else {
            SimpleAlerts.showError(this.message);
          }
        });
        this.subscriptions.push(successSubscription);
      }
    });
    this.subscriptions.push(loadingSubscription);
  }

  getLookUps() {
    this.store.dispatch(getLookUpsAction());
    this.store.select(selectLookUpsView).subscribe((lookUps) => {
      if(lookUps){
       this.lookUps = lookUps;
       this.sexOptions = this.lookUps?.lookUpData?.filter((item: LookUpData) => item.tableCode === LookUpTableEnum.Sex) || [];
      }
    });
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

