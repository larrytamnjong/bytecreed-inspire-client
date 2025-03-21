import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
// Load Icons
import { defineElement } from "@lordicon/element";
import lottie from 'lottie-web';
import { ToastsContainer } from './login/toasts-container.component';
import { AccountRoutingModule } from './account-routing.module';
import { SigninModule } from "./auth/signin/signin.module";
import { SignupModule } from "./auth/signup/signup.module";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ApiHttpService } from '../core/services/common/base-api-http-service';
import { UserApi } from '../core/services/authentication/user-api';
import { IdentityApiHttpService } from '../core/services/common/base-identity-api-http-service';
import { TokenService } from '../core/services/authentication/token-service';
import { LookUpApi } from '../core/services/common/look-up-service';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ToastsContainer
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbToastModule,
    AccountRoutingModule,
    SigninModule
  ],
  providers: [
    ApiHttpService, 
    UserApi, 
    IdentityApiHttpService, 
    TokenService,
    LookUpApi
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
