import { Component, OnInit } from '@angular/core';
import { AcademicYear } from 'src/app/core/Models/api/academics';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { finalize } from 'rxjs';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { AcademicService } from 'src/app/core/services/api/academics.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'app-academic-years',
  templateUrl: './academic-years.component.html',
  styleUrl: './academic-years.component.scss'
})
export class AcademicYearsComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

    submitted: boolean = false;
 
    academicYears: AcademicYear[] | undefined | any = [];
    academicYearForm!: UntypedFormGroup;
    isCreateMode: boolean = true;
    get form() {return this.academicYearForm.controls;}
  
    headers: any = [
      { key: 'name', displayName: 'Name' },
      { key: 'isActive', displayName: 'Status' },
      { key: 'startDate', displayName: 'Start Date' },
      { key: 'endDate', displayName: 'End Date' },
      { key: 'sortOrder', displayName: 'Sort Order' }
    ]
  
    constructor(
      private modalService: NgbModal,
      private academicFormBuilder: UntypedFormBuilder,
      private academicService: AcademicService,
      protected override store: Store<{ data: RootReducerState }>
    ) {
      super(store);
    }


  ngOnInit(): void {
    this.getLookUps();
    this.breadCrumbItems = [{ label: 'Configuration' },{ label: 'Academics'}, { label: 'Academic Years', active: true }];

    this.academicYearForm = this.academicFormBuilder.group({
      id: [null],
      name: ['',[Validators.required]],
      isActive: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null],
      sortOrder: [null, [Validators.required]]
    });

    this.getAcademicYears();
 }

 addModal(content: any) {
  this.isCreateMode = true;
  this.submitted = false;
  this.modalService.open(content, this.lgModalConfig);
}

  editModal(content: any, academicYear: AcademicYear) {
    this.isCreateMode = false;
    this.submitted = false;
    this.academicYearForm.setValue({...academicYear});
    this.modalService.open(content, this.lgModalConfig);
  }

  getAcademicYears() {
    this.toggleLoading();
    this.academicService.getAcademicYears().pipe(finalize(() => this.toggleLoading()))
      .subscribe({
        next: (response) => {
          this.academicYears = response.data;
        },
        error: (error) => {
          SimpleAlerts.showError(getErrorMessage(error));
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.academicYearForm.invalid) {
      return;
    }
    
    this.modalService.dismissAll();
      var startDate = this.academicYearForm.value.startDate;
      this.academicYearForm.patchValue({
        startDate:  this.formatDateToLocalISOString(new Date(startDate))
      });
      

      if (this.academicYearForm.value.endDate) {
       var endDate = this.academicYearForm.value.endDate;
      this.academicYearForm.patchValue({
        endDate:  this.formatDateToLocalISOString(new Date(endDate))
      });
    }

    if(this.isCreateMode){
      this.toggleLoading();
      this.academicService.createAcademicYear(this.academicYearForm.value).pipe(
        finalize(() => {this.toggleLoading(); this.reset();})
      ).subscribe({
        next: (response) => {
          if(response.success){
            this.getAcademicYears();
            SimpleAlerts.showSuccess();
          }
        },
        error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
      });
    }else{
      SimpleAlerts.confirmDialog().then((result) => {
        if (result) {
          this.toggleLoading();
          this.academicService.updateAcademicYear(this.academicYearForm.value).pipe(
            finalize(() => {this.toggleLoading(); this.reset();})
          ).subscribe({
            next: (response) => {
              if(response.success){
                this.getAcademicYears();
                SimpleAlerts.showSuccess();
              }
            },
            error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
          })
        }else{
          return;
        }
      });
    }
  }

  deleteAcademicYear(academicYear: AcademicYear){
      SimpleAlerts.confirmDeleteDialog().then((result) => {
        if (result) {
          this.toggleLoading();
          this.academicService.deleteAcademicYear(academicYear.id!).pipe(finalize(() => {this.toggleLoading();})).subscribe({
            next: (response) => {
              if(response.success){
                this.getAcademicYears();
                SimpleAlerts.showSuccess();
              }
            },
            error : (error) => {
                SimpleAlerts.showError(getErrorMessage(error));
              }
          });
        }
      });
    }

  dismissModal() {
    this.modalService.dismissAll();
    this.reset();
  }

  reset() {
    this.submitted = false;
    this.isCreateMode = true;
    this.academicYearForm.reset();
  }


}
