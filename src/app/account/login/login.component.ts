import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { TokenService } from "src/app/core/services/authentication/token-service";

// Login Auth
import { first } from "rxjs/operators";
import { ToastService } from "./toast-service";
import { UserApi } from "src/app/core/services/authentication/user-api";
import { SimpleAlerts } from "src/app/core/services/notifications/sweet-alerts";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {
  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;

  toast!: false;

  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    public toastService: ToastService,
    private userService: UserApi,
    private tokenService: TokenService,
  ) {
    if (1 > 2) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("currentUser")) {
      this.router.navigate(["/"]);
    }

    this.loginForm = this.formBuilder.group({
      phone: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  get f() {return this.loginForm.controls;}

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const loginData = {
      phone: this.f["phone"].value,
      password: this.f["password"].value,
    };

    this.userService.loginUser(loginData).pipe(first()).subscribe({
        next: (response: any) => {
          if (response.success) {
            SimpleAlerts.showSuccess();
            this.tokenService.saveToken(response.data.jwtToken.value);
            this.tokenService.saveUser(response.data.user);
            this.router.navigate(["/"]);
          } else {
            SimpleAlerts.showError();
          }
        },
        error: (error: any) => {
          SimpleAlerts.showError();
        }
      });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
