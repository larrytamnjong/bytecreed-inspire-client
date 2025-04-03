import { Component, OnInit } from '@angular/core';
import { AcademicYear } from 'src/app/core/Models/api/academics';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { finalize } from 'rxjs';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';
import { AcademicService } from 'src/app/core/services/api/academics.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-academic-years',
  templateUrl: './academic-years.component.html',
  styleUrl: './academic-years.component.scss'
})
export class AcademicYearsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

    loading: boolean = false;
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
    ]
  
    constructor(
      private modalService: NgbModal,
      private academicFormBuilder: UntypedFormBuilder,
      private academicService: AcademicService
    ) {}


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Configuration' },{ label: 'Academics'}, { label: 'Academic Years', active: true }];

    this.academicYearForm = this.academicFormBuilder.group({
      id: [null],
      name: ['',[Validators.required]],
      isActive: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null],
    });

    this.getAcademicYears();
 }

 addModal(content: any) {
  this.isCreateMode = true;
  this.submitted = false;
  this.modalService.open(content, { size: 'md', centered: true });
}

  editModal(content: any, academicYear: AcademicYear) {
    this.isCreateMode = false;
    this.submitted = false;
    this.academicYearForm.setValue({...academicYear});
    this.modalService.open(content, { size: 'md', centered: true });
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
    this.toggleLoading();
    this.submitted = true;
    if (this.academicYearForm.invalid) {
      this.toggleLoading();
      return;
    }
    
    this.modalService.dismissAll();

    if(this.isCreateMode){
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
        }
      });
    }
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

  toggleLoading() {
    this.loading = !this.loading;
  }

}
