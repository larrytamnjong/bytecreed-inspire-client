import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TokenService } from "src/app/core/services/token.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApplicationTypeEnum } from "src/app/core/enums/application-type";
import { Institution } from "src/app/core/Models/identity/institution";
import { RootReducerState } from "src/app/store";
import { Store } from "@ngrx/store";
import { selectInstitutionLoading, selectLoggedInToInstitutionData } from "src/app/store/identity/institution/institution.selector";
import { selectUserLoading, selectUserLoggedInData } from "src/app/store/identity/user/user.selector";
import { userLoginAction } from "src/app/store/identity/user/user.action";
import { loginToInstitutionAction } from "src/app/store/identity/institution/institution.action";
import { SimpleAlerts } from "src/app/core/services/notifications/sweet-alerts";
import { combineLatest, map } from "rxjs";
import { Subscription } from "rxjs";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
   private subscriptions: Subscription[] = [];
  public ApplicationTypeEnum = ApplicationTypeEnum;

  selectApplicationModalRef!: NgbModalRef;
  selectInstitutionModalRef!: NgbModalRef;

  @ViewChild('selectInstitutionContent') selectInstitutionContent!: TemplateRef<any>;
  @ViewChild('selectAppContent') selectAppContent!: TemplateRef<any>;

  loadingLogin$ = this.userStore.select(selectUserLoading);
  loggedInData$ = this.userStore.select(selectUserLoggedInData);
  loadingLoginToInstitution$ = this.institutionStore.select(selectInstitutionLoading);
  loggedInToInstitutionData$ = this.institutionStore.select(selectLoggedInToInstitutionData);

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
    private userStore: Store<{ data: RootReducerState }>,
    private institutionStore: Store<{ data: RootReducerState }>
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
    const loadingSubscription = combineLatest([this.loadingLogin$, this.loadingLoginToInstitution$])
    .pipe(map(([loadingLogin, loadingInstitution]) => loadingLogin || loadingInstitution))
    .subscribe((loading) => {this.loading = loading;});
    this.subscriptions.push(loadingSubscription);
  }

  get f() {return this.loginForm.controls;}

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const login = {
      phone: this.f["phone"].value,
      password: this.f["password"].value,
    };

    this.userStore.dispatch(userLoginAction({ payload: login }));
   const loginLoadingSubscription = this.loadingLogin$.subscribe((loading) => {
      if(!loading){
     const loggedInDataSubscription = this.loggedInData$.subscribe((data) => {
        if (!data){
          SimpleAlerts.showError();
          return;
        }
        this.options = data.options;
        this.tokenService.saveToken(data.jwtToken.value);
        this.tokenService.saveUser(data.user);
        this.institutions = data.options.map((option: any) => option.institution);
        this.handleInstitutionSelection();
      });
      this.subscriptions.push(loggedInDataSubscription);
    }
    });
    this.subscriptions.push(loginLoadingSubscription);


  }

  handleInstitutionSelection() {
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
    if (!this.selectedInstitution){
      this.router.navigate(["/"]);
      return;
    }
      this.institutionStore.dispatch(loginToInstitutionAction({ institutionId: this.selectedInstitution!.id, applicationType: applicationType }));
      const loadingLoginInstitutionSubscription = this.loadingLoginToInstitution$.subscribe((loading) => {
      if (!loading) {
        const loggedInInstitutionDataSubscription = this.loggedInToInstitutionData$.subscribe((data) => {
          if (data) {
            this.tokenService.saveToken(data.jwtToken.value);
            this.tokenService.saveRefreshToken(data.refreshToken.value);
            this.modalService.dismissAll();
            this.router.navigate(["/"]);
          } 
        });
        this.subscriptions.push(loggedInInstitutionDataSubscription);
      }
    });
    this.subscriptions.push(loadingLoginInstitutionSubscription);
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
    setTimeout(() => {location.reload();}, 100); 
  }

  openSelectApplicationModal() {
    this.modalService.dismissAll();
    this.selectApplicationModalRef = this.modalService.open(this.selectAppContent, { size: 'lg', centered: true, backdrop: 'static', keyboard: false });
  }

  closeSelectApplicationModal() {
    this.tokenService.signOut();
    this.selectApplicationModalRef.close();
    setTimeout(() => {location.reload();}, 100); 
  }

  onSelectInstitution(institution: Institution) {
    this.selectedInstitution = institution;
    this.setApplicationTypes();
    this.handleApplicationSelection();
  }

  onSelectApplication(application: ApplicationTypeEnum) {
    if (this.applicationTypes.includes(application)) {
      this.selectedApplicationType = application;
      this.handleInstitutionLogin(application);
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
}
}
