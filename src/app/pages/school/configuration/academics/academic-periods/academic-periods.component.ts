import { Component, OnInit } from '@angular/core';
import { AcademicPeriod, AcademicTerm, AcademicYear } from 'src/app/core/Models/api/academics';
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
  selector: 'app-academic-periods',
  templateUrl: './academic-periods.component.html',
  styleUrl: './academic-periods.component.scss'
})
export class AcademicPeriodsComponent  extends BaseComponent implements OnInit {
    breadCrumbItems!: Array<{}>;

    submitted: boolean = false;

    academicTerms: AcademicTerm[] | undefined = [];
    academicYears: AcademicYear[] | undefined = [];
  
    academicPeriods: AcademicPeriod[] | undefined | any = [];
    academicPeriodForm!: UntypedFormGroup;
    isCreateMode: boolean = true;
    get form() {return this.academicPeriodForm.controls;}
  
    headers: any = [
      { key: 'name', displayName: 'Name' },
      { key: 'isActive', displayName: 'Status' },
      { key: 'academicYearName', displayName: 'Academic Year' },
      { key: 'academicTermName', displayName: 'Academic Term' },
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
    this.getAcademicYears();
    this.getAcademicTerms();
    this.breadCrumbItems = [{ label: 'Configuration' },{ label: 'Academics'}, { label: 'Academic Periods', active: true }];

    this.academicPeriodForm = this.academicFormBuilder.group({
      id: [null],
      name: [null],
      isActive: [null, [Validators.required]],
      academicYearId: [null, [Validators.required]],
      academicTermId: [null, [Validators.required]],
      staticId: [null]
    });

    this.getAcademicPeriods();

 }

 addModal(content: any) {
  this.isCreateMode = true;
  this.submitted = false;
  this.modalService.open(content, this.lgModalConfig);
}

  editModal(content: any, academicPeriod: AcademicPeriod) {
    this.isCreateMode = false;
    this.submitted = false;

    var data = {
      id: academicPeriod.id,
      isActive: academicPeriod.isActive,
      name: null,
      academicYearId: academicPeriod.academicYearId,
      academicTermId: academicPeriod.academicTermId,
      staticId: academicPeriod.staticId
    };
    this.academicPeriodForm.setValue(data);
    this.modalService.open(content, this.lgModalConfig);
  }

  getAcademicPeriods() {
    this.toggleLoading();
    this.academicService.getAcademicPeriods().pipe(finalize(() => this.toggleLoading()))
      .subscribe({
        next: (response) => {
          this.academicPeriods = response.data;
        },
        error: (error) => {
          SimpleAlerts.showError(getErrorMessage(error));
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.academicPeriodForm.invalid) {
      return;
    }
    
    this.modalService.dismissAll();

    if(this.isCreateMode){
      this.toggleLoading();
      this.academicService.createAcademicPeriod(this.academicPeriodForm.value).pipe(
        finalize(() => {this.toggleLoading(); this.reset();})
      ).subscribe({
        next: (response) => {
          if(response.success){
            this.getAcademicPeriods();
            SimpleAlerts.showSuccess();
          }
        },
        error: (error) => {SimpleAlerts.showError(getErrorMessage(error));},
      });
    }else{
      SimpleAlerts.confirmDialog().then((result) => {
        if (result) {
          this.toggleLoading();
          this.academicService.updateAcademicPeriod(this.academicPeriodForm.value).pipe(
            finalize(() => {this.toggleLoading(); this.reset();})
          ).subscribe({
            next: (response) => {
              if(response.success){
                this.getAcademicPeriods();
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

  dismissModal() {
    this.modalService.dismissAll();
    this.reset();
  }

  reset() {
    this.submitted = false;
    this.isCreateMode = true;
    this.academicPeriodForm.reset();
  }


  getAcademicTerms() {
    this.academicService.getAcademicTerms().subscribe({
        next: (response) => {
          this.academicTerms = response.data;
        },
        error: (error) => { }
      });
  }
  
  getAcademicYears() {
    this.academicService.getAcademicYears().subscribe({
        next: (response) => {
          this.academicYears = response.data;
        },
        error: (error) => { }
      });
  }

}
