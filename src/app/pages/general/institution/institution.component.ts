import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationService } from 'src/app/core/services/general/pagination.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { TokenService } from 'src/app/core/services/general/token.service';
import { Institution } from 'src/app/core/Models/identity/institution';
import { InstitutionService } from 'src/app/core/services/identity/institution.service';
import { User } from 'src/app/core/Models/identity/user';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { finalize } from 'rxjs';
import { map } from 'rxjs';

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
  searchTerm: any;
  searchResults: any;
  institutionList: any;
  institutionListCopy: any;
  user: User = new User();

  constructor(private modalService: NgbModal,
              public service: PaginationService, 
              private formBuilder: UntypedFormBuilder, 
              private tokenService: TokenService,
              private institutionService: InstitutionService,
            ){}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'General' }, { label: 'Institution', active: true }];

    this.institutionForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
    
    this.user = this.tokenService.getUser();
    this.getUserInstitutions();
  }

  get form() {return this.institutionForm.controls;}

  getUserInstitutions(){
    this.toggleLoading();
    this.institutionService.getUserInstitutions(this.user.id!).pipe(map(response => response.data),
      finalize(() => this.toggleLoading())).subscribe({
        next: (institutions: Institution[]) => {
        this.institutionListCopy = institutions;
        this.institutionList = cloneDeep(institutions);
        this.institutionListCopy = this.service.changePage(this.institutionList)
        },
        error : () => {}
      });
  }

  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  onSort(column: any) {
    this.institutionListCopy = this.service.onSort(column, this.institutionListCopy)
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
        this.afterSuccessfulCreate();
        SimpleAlerts.showSuccess();
      }else{
        SimpleAlerts.showError();
      }
    },
    error: (error)=>{}
  });
}

afterSuccessfulCreate(){
  this.searchTerm = '';
  this.institutionForm.reset();
  this.submitted = false;
  this.getUserInstitutions();
}

  changePage() {
    this.institutionListCopy = this.service.changePage(this.institutionList)
  }

  getStatusLabel(status: boolean) : string {
    return status ? 'Active' : 'Inactive';
  }

  closeCreateInstitutionModal() {
    this.modalService.dismissAll();
  }

  performSearch(): void {
    this.searchResults = this.institutionList.filter((item: any) => {
      return (
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || item.code.toLowerCase().includes(this.searchTerm.toLowerCase()) 
      );
    });
    this.institutionListCopy = this.service.changePage(this.searchResults)
  }

  ngOnDestroy(): void {}

toggleLoading() {
  this.loading = !this.loading;
}
}
