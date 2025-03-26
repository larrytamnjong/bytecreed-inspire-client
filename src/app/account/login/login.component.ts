import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TokenService } from "src/app/core/services/token.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApplicationTypeEnum } from "src/app/core/enums/application-type";
import { Institution } from "src/app/core/Models/identity/institution";
import { SimpleAlerts } from "src/app/core/services/notifications/sweet-alerts";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { InstitutionService } from "src/app/core/services/identity/institution.service";
import { UserService } from "src/app/core/services/identity/user.service";
import { finalize } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {

  public ApplicationTypeEnum = ApplicationTypeEnum;

  selectApplicationModalRef!: NgbModalRef;
  selectInstitutionModalRef!: NgbModalRef;

  @ViewChild('selectInstitutionContent') selectInstitutionContent!: TemplateRef<any>;
  @ViewChild('selectAppContent') selectAppContent!: TemplateRef<any>;

  loading = false;
  institutions: Institution[] = [];
  selectedInstitution?: Institution;
  applicationTypes: any = [];
  selectedApplicationType?: ApplicationTypeEnum;
  loginForm!: UntypedFormGroup;
  submitted = false;
  options : any;
  fieldTextType = false;
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private tokenService: TokenService,
    private modalService: NgbModal,
    private institutionService: InstitutionService,
    private userService: UserService,
  ) {
    this.loginForm = this.formBuilder.group({
      phone: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.tokenService.isUserLoggedIn()) {
      this.router.navigate(["/"]);
      return;
    }
  }

  get f() {return this.loginForm.controls;}

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.loginForm.invalid){
      this.loading = false;
      return;
    } 

    const login = {
      phone: this.f["phone"].value,
      password: this.f["password"].value,
    };

  this.userService.loginUser(login).pipe(
    finalize(() => {
      this.loading = false;
    })
  ).subscribe({
    next: (response) => {
      if(response.data){
      this.tokenService.saveToken(response.data.jwtToken.value);
      this.tokenService.saveUser(response.data.user);
      this.options = response.data.options;
      this.institutions = response.data.options.map((option: any) => option.institution);
      this.handleInstitutionSelection();
      }else{SimpleAlerts.showError();}
    },
    error: () => {SimpleAlerts.showError();}
  });

  }

  handleInstitutionSelection() {
    if(!this.institutions.length){
      this.handleInstitutionLogin();
    }
    if (this.institutions.length === 1) {
      this.selectedInstitution = this.institutions[0];
      this.setApplicationTypes();
      this.handleApplicationSelection();
    } else if (this.institutions.length > 1) {
      this.openSelectInstitutionModal();
    }else{
      this.handleInstitutionLogin();
    }
  }

  handleApplicationSelection() {
    if (!this.applicationTypes.length) {
      this.handleInstitutionLogin();
    } else if (this.applicationTypes.length === 1) {
      this.selectedApplicationType = this.applicationTypes[0];
      this.handleInstitutionLogin(this.selectedApplicationType);
    } else if (this.applicationTypes.length > 1) {
      this.openSelectApplicationModal();
    }else{
      this.handleInstitutionLogin();
    }
  }

  handleInstitutionLogin(applicationType?: ApplicationTypeEnum) {
    this.loading = true;
    if (!this.selectedInstitution){
      this.loading = false;
      this.router.navigate(["/"]);
      return;
    }

    this.institutionService.logInToInstitution(this.selectedInstitution!.id!, applicationType).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
     next: (response) => {
        if(response.data){
          this.tokenService.saveToken(response.data.jwtToken.value);
          this.tokenService.saveRefreshToken(response.data.refreshToken.value);
          this.router.navigate(["/"]);
        }else{this.handleLoginToInstitutionError();}
     },
     error: () =>{this.handleLoginToInstitutionError();},
    });
  }

  setApplicationTypes() {
    if (!this.selectedInstitution){
      this.router.navigate(["/"]);
      return;
    }
    const selectedOption = this.options.find((option: any) => option.institution.id === this.selectedInstitution!.id);
    this.applicationTypes = selectedOption ? selectedOption.applicationTypes : [];
  }

  openSelectInstitutionModal() {
    this.selectInstitutionModalRef = this.modalService.open(this.selectInstitutionContent, { size: 'lg', centered: true, backdrop: 'static', keyboard: false });
  }

  closeSelectInstitutionModal() {
    this.tokenService.signOut();
    this.selectInstitutionModalRef.close();
    this.reloadLocation();
  }

  openSelectApplicationModal() {
    this.modalService.dismissAll();
    this.selectApplicationModalRef = this.modalService.open(this.selectAppContent, { size: 'lg', centered: true, backdrop: 'static', keyboard: false });
  }

  closeSelectApplicationModal() {
    this.tokenService.signOut();
    this.selectApplicationModalRef.close();
    this.reloadLocation();
  }

  onSelectInstitutionContinue() {
    if(!this.selectedInstitution)return;
    this.selectInstitutionModalRef.close();
    this.setApplicationTypes();
    this.handleApplicationSelection();
  }

  onSelectApplication(application: ApplicationTypeEnum) {
    if (this.applicationTypes.includes(application)) {
      this.selectApplicationModalRef.close();
      this.selectedApplicationType = application;
      this.handleInstitutionLogin(application);
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  handleLoginToInstitutionError(){
    SimpleAlerts.showError();
    this.tokenService.signOut();
    this.reloadLocation();
  }

  reloadLocation(){
    setTimeout(() => {location.reload();}, 100); 
  }

  ngOnDestroy(): void {}
}
