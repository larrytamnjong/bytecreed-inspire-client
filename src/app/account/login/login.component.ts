import { Component, OnInit } from "@angular/core";
import {UntypedFormBuilder,UntypedFormGroup,Validators,} from "@angular/forms";
import { Router } from "@angular/router";
import { TokenService } from "src/app/core/services/token-service";
import { first } from "rxjs/operators";
import { ToastService } from "./toast-service";
import { UserApi } from "src/app/core/services/identity/user-api.service";
import { SimpleAlerts } from "src/app/core/services/notifications/sweet-alerts";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TemplateRef, ViewChild } from "@angular/core";
import { ApplicationTypeEnum } from "src/app/core/enums/application-type";
import { InstitutionApi } from "src/app/core/services/identity/institution-api.service";
import { Institution } from "src/app/core/Models/identity/institution";
import { UserRoleApi } from "src/app/core/services/identity/user-role.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {
  public ApplicationTypeEnum = ApplicationTypeEnum;
  
  @ViewChild('selectInstitutionContent') selectInstitutionContent!: TemplateRef<any>;
  @ViewChild('selectAppContent') selectAppContent!: TemplateRef<any>;

  userInstitutions: Institution[] = [];
  selectedInstitution?: Institution;

  userApps: ApplicationTypeEnum[] = []
  selectedApp?: ApplicationTypeEnum;
  user: any;

  isLoading = false;

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;

  //toast!: false;

  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    public toastService: ToastService,
    private userService: UserApi,
    private tokenService: TokenService,
    private modalService: NgbModal,
    private institutionService: InstitutionApi,
    private userRoleService: UserRoleApi
  ) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("currentUser")) {
      this.router.navigate(["/"]);
    }

    this.loginForm = this.formBuilder.group({
      phone: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });

    this.hideLoader();
  }

  get f() {return this.loginForm.controls;}

  onSubmit() {
    this.showLoader();
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.hideLoader()
      return;
    }

    const loginData = {
      phone: this.f["phone"].value,
      password: this.f["password"].value,
    };

    this.userService.loginUser(loginData).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.user = response.data.user;
            this.tokenService.saveToken(response.data.jwtToken.value);
            this.tokenService.saveUser(this.user);
            this.getUserInstitutions(this.user.id);

            if(!this.userInstitutions || this.userInstitutions.length < 1) {
              this.router.navigate(["/"]);
            }

            if(this.userInstitutions && this.userInstitutions.length > 1){
              this.openSelectInstitutionModal();
            }

            if(this.userInstitutions && this.userInstitutions.length == 1){
                this.selectedInstitution = this.userInstitutions[0];
                this.getUserApps();
              }             
          } else {
            SimpleAlerts.showError();
          }
        },
        error: () => {
          SimpleAlerts.showError();
        }
      });
        this.hideLoader();
  }

  logInToInstitution() {
    this.showLoader();
    this.institutionService.logInToInstitution(this.selectedInstitution!.id!, this.selectedApp).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.tokenService.saveToken(response.data.jwtToken.value);
          this.tokenService.saveUser(this.user);
          this.tokenService.saveRefreshToken(response.data.refreshToken.value);
          this.router.navigate(["/"]);
        } else {
          SimpleAlerts.showError();
        }
      },
      error: () => {
        SimpleAlerts.showError();
      }
    });
    this.hideLoader();
  }

  getUserInstitutions(userId: string) {
    this.institutionService.getUserInstitutions(userId).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.userInstitutions = response.data;
        }
      },
      error: () => { }
    });
  }

  getUserApps() {
    this.userRoleService.getUserApplicationTypes(this.user.id, this.selectedInstitution!.id!).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.userApps = response.data;
          if(this.userApps && this.userApps.length == 1){
            this.selectedApp = this.userApps[0];
            this.logInToInstitution();
          }
          if(this.userApps && this.userApps.length > 1){
          this.openSelectAppModal();
         }else{
         this.logInToInstitution();
        }
        }
      },
      error: () => {
        SimpleAlerts.showError();
      }
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  openSelectInstitutionModal() {
    this.submitted = false;
    this.modalService.open(this.selectInstitutionContent, { size: 'lg', centered: true });
  }

  openSelectAppModal() {
    this.modalService.dismissAll();
    this.submitted = false;
    this.modalService.open(this.selectAppContent, { size: 'lg', centered: true });
  }

  onSelectInstitution(institution: any) {
   this.selectedInstitution = institution;
   this.getUserApps();
  }

  onSelectApp(app: ApplicationTypeEnum) {
   if(app && this.userApps.includes(app) ) {
    this.selectedApp = app;
    this.logInToInstitution();
   }else{
    return;
   }
  }

  showLoader() {
    this.isLoading = true;
    document.getElementById('elmLoader')?.classList.remove('d-none');
  }

  hideLoader() {
    this.isLoading = false;
    document.getElementById('elmLoader')?.classList.add('d-none');
  }
}
