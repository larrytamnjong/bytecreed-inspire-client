import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { Personnel } from 'src/app/core/Models/api/personnel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PersonnelService } from 'src/app/core/services/api/personnel.service';
import { finalize} from 'rxjs';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent extends BaseComponent implements OnInit{
 breadCrumbItems!: Array<{}>;
 reloadTable: number = 1;
 isCreateMode: boolean = true; 
 submitted = false;  
 personnelForm!: UntypedFormGroup;
 employees: any = []; 

  get fPersonnel() {return this.personnelForm.controls;}


  headers: any = [
    { key: 'familyName', displayName: 'Family Name' },
    { key: 'givenNames', displayName: 'Given Names'}, 
    { key: 'dateOfBirth', displayName: 'Date Of Birth' },
    { key: 'dateOfEmployment', displayName: "Date of Employment"},
    { key: 'sex', displayName: 'Sex' },
  ];


  constructor(
    private modalService: NgbModal,
    private personnelService: PersonnelService,
    private personnelFormBuilder: UntypedFormBuilder,
    protected override store: Store<{ data: RootReducerState }>) {
      super(store);
    }

    ngOnInit(): void {
        this.breadCrumbItems = [{label: 'Personnel'},{ label: 'Employees', active: true }]

        this.personnelForm = this.personnelFormBuilder.group({
              id: [null],
              familyName: [null, [Validators.required]],
              givenNames: [null, [Validators.required]],
              dateOfBirth: [null, [Validators.required]],
              dateOfEmployment: [null, [Validators.required]],
              sex: [null,[Validators.required]],
              userId: [null],
              addressId: [null]
          });

        this.getLookUps();
        this.getEmployees();
    }


  addModal(content: any) {
    this.isCreateMode = true;
    this.submitted = false;
    this.modalService.open(content, {...this.mdModalConfig, backdrop: 'static'});
  }

   editModal(content: any, personnel: Personnel) {
       this.isCreateMode = false;
       this.submitted = false;
       this.personnelForm.setValue(personnel);
       this.modalService.open(content, {...this.mdModalConfig, backdrop: 'static'});
    }


  dismissModal() {
  this.modalService.dismissAll();
    this.resetForm();
  }
     
  toggleReloadTable(){
      this.reloadTable++;
  }

   onSubmit() {
        this.submitted = true;
        if (this.personnelForm.invalid) {
          return;
        }
          
        let employee = this.personnelForm.value;
        employee.sex = this.parseToNumber(employee.sex);
        employee.dateOfBirth = this.formatDateToLocalISOString(new Date(this.personnelForm.get('dateOfBirth')?.value));
        employee.dateOfEmployment = this.formatDateToLocalISOString(new Date(this.personnelForm.get('dateOfEmployment')?.value));

        if(this.isCreateMode){
          this.toggleLoading();
          this.personnelService.createPersonnel(employee).pipe(
            finalize(() => {this.toggleLoading(); this.resetForm();})).subscribe({
            next: (response) => {
              if(response.success){
                this.modalService.dismissAll();
                this.getEmployees();
                SimpleAlerts.showSuccess();
              }
            },
            error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
          });
        }else{
          SimpleAlerts.confirmDialog().then((result) => {
            if (result) {
              this.toggleLoading();
              this.personnelService.updatePersonnel(employee).pipe(
                finalize(() => {this.toggleLoading();})).subscribe({
                next: (response) => {
                  if(response.success){
                    this.getEmployees();
                    SimpleAlerts.showSuccess();
                    this.dismissModal();
                  }
                },
                error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
              })
            }else{
              this.toggleLoading();
            }
          });
        }
      }

    resetForm() {
      this.submitted = false;
      this.isCreateMode = true;
      this.personnelForm.reset();
    }

     getEmployees() {
      this.toggleLoading();
      this.personnelService.getEmployees().pipe(
        finalize(() => {this.loading = false;})).subscribe({
        next: (response) => {
          if(response.success){ this.employees = response.data;}
        },
        error: () => {},
      });
    }
}