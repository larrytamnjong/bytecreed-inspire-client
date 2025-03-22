import { Component, OnInit } from "@angular/core";
import {UntypedFormBuilder, UntypedFormGroup,Validators} from "@angular/forms";
import { FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
// Register Auth
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { LookUpView } from "src/app/core/Models/look-ups/look-up-view";
import { UserApi } from "src/app/core/services/authentication/user-api";
import { LookUpApi } from "src/app/core/services/common/look-up-service";
import { SimpleAlerts } from "src/app/core/services/notifications/sweet-alerts";
import { LookUpData } from "src/app/core/Models/look-ups/look-up-data";
import { LookUpTable } from "src/app/core/enums/look-up-table";

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => { 
      if (!(control instanceof FormGroup)) { 
          return null; 
      }
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (password && confirmPassword && password !== confirmPassword) {
          return { passwordMismatch: true };
      }

      return null;
  };
}

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})

/**
 * Register Component
 */
export class RegisterComponent implements OnInit {
  // Login Form
  signupForm!: UntypedFormGroup;
  submitted = false;
  
  // set the current year
  year: number = new Date().getFullYear();

  lookUps: LookUpView = new LookUpView();
  sexOptions: LookUpData[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private userService: UserApi,
    private lookUpService: LookUpApi,
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
    },{ validator: passwordMatchValidator() });
  }


  get f() {return this.signupForm.controls;}


  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    const userData = {
      phone: this.f["phone"].value,
      familyName: this.f["familyName"].value,
      givenNames: this.f["givenNames"].value,
      password: this.f["password"].value,
      sex: Number(this.f["sex"].value),
    };

    this.userService.registerUser(userData).pipe(first()).subscribe({
        next: (response: any) => {
          if(response.success) {
            SimpleAlerts.showSuccess();
            this.router.navigate(['/auth/login'])
          } else {
            SimpleAlerts.showError();
          }
        },
        error: () => {SimpleAlerts.showError(); },
      });
  }

  getLookUps() {
    this.lookUpService.getAll().subscribe({
      next: (response) => {
        this.lookUps = response; 
        this.sexOptions = this.lookUps.lookUpData?.filter((item: LookUpData) => item.tableCode === LookUpTable.Sex) || [];
        },
      error: () => {}
    });
  }
}
