import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

// Register Auth
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { UserApi } from "src/app/core/services/authentication/user-api";
import { SimpleAlerts } from "src/app/core/services/notifications/sweet-alerts";

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

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private userService: UserApi,
  ) {}

  ngOnInit(): void {
    
    this.signupForm = this.formBuilder.group({
      phone: ["", [Validators.required]],
      familyName: ["", [Validators.required]],
      givenNames: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });
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
      sex: 1
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
        error: (error: any) => {
          SimpleAlerts.showError();
        },
      });
  }
}
