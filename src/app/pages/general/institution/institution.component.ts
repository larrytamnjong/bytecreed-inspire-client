import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TokenService } from 'src/app/core/services/general/token.service';
import { Institution } from 'src/app/core/Models/identity/institution';
import { InstitutionService } from 'src/app/core/services/identity/institution.service';
import { User } from 'src/app/core/Models/identity/user';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { finalize } from 'rxjs';
import { map } from 'rxjs';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { LookUpView } from 'src/app/core/Models/common/look-up-view';
import { LookUpData } from 'src/app/core/Models/common/look-up-data';
import { getLookUpsAction } from 'src/app/store/common/look-up/look-up.action';
import { selectLookUpsView } from 'src/app/store/common/look-up/look-up.selector';
import { LookUpTableEnum } from 'src/app/core/enums/look-up-table';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrl: './institution.component.scss'
})
export class InstitutionComponent {
  breadCrumbItems!: Array<{}>;

  loading = false;
  submitted = false;
  institutionForm!: UntypedFormGroup;
  institutionList: Institution[] | undefined | any = [];
  user: User = new User();

    lookUps?: LookUpView;
    activeAndInactiveStatus: LookUpData[] = [];

  headers: any = [
    { key: 'code', displayName: 'Code' },
    { key: 'name', displayName: 'Name' },
    { key: 'isActive', displayName: 'Status' },
    { key: 'dateCreated', displayName: 'Created Date' },
  ]

  clickableColumns: any = [
    'code',
    'name',
    'isActive',
    'dateCreated'
  ]
  constructor(private modalService: NgbModal,
              private formBuilder: UntypedFormBuilder, 
              private tokenService: TokenService,
              private institutionService: InstitutionService,
              private store: Store<{ data: RootReducerState }>
            ){}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'General' }, { label: 'Institution', active: true }];

    this.institutionForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
    this.getLookUps();
    this.user = this.tokenService.getUser();
    this.getUserInstitutions();
  }

  get form() {return this.institutionForm.controls;}

  getUserInstitutions(){
    this.toggleLoading();
    this.institutionService.getUserInstitutions(this.user.id!).pipe(
      finalize(() => this.toggleLoading())).subscribe({
        next: (response: any) => {
        this.institutionList = response.data;
        },
        error : () => {}
      });
  }

  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  createInstitution(){
    this.toggleLoading();
    this.submitted = true;
   if (this.institutionForm.invalid) {
    this.toggleLoading();
     return;
   }

   const institution = {
     name: this.form["name"].value,
  }

  this.closeCreateInstitutionModal();
  this.institutionService.createInstitution(institution).pipe(map(response => response.data),
    finalize(() => this.toggleLoading())).subscribe({
    next: (response) =>{
      if(response){
        this.afterSuccessfulCreate(response);
      }else{
        SimpleAlerts.showError();
      }
    },
    error: (error) => {
      SimpleAlerts.showError(getErrorMessage(error));
    }
  });
}
onRowClicked(institution: Institution){
  console.log(institution);
}
afterSuccessfulCreate(data: any){
  this.tokenService.saveInstitution(data.institution);
  this.tokenService.saveToken(data.token.jwtToken.value);
  this.tokenService.saveRefreshToken(data.token.refreshToken.value);
  SimpleAlerts.showSuccess();
  setTimeout(() => {location.reload();}, 1100);
}

getStatusLabel(status: boolean): string {
  const statusCode = status ? 1 : 0;
  const statusItem = this.activeAndInactiveStatus.find(item => item.dataCode === statusCode);
  return statusItem!.text;
}

    getLookUps() {
      this.store.dispatch(getLookUpsAction());
      this.store.select(selectLookUpsView).subscribe((lookUps) => {
        if(lookUps){
         this.lookUps = lookUps;
         this.activeAndInactiveStatus = this.lookUps?.lookUpData?.filter((item: LookUpData) => item.tableCode === LookUpTableEnum.ActiveAndInactiveStatus) || [];
        }
      });
    }

  closeCreateInstitutionModal() {
    this.modalService.dismissAll();
  }

ngOnDestroy(): void {}

toggleLoading() {this.loading = !this.loading;}

}
