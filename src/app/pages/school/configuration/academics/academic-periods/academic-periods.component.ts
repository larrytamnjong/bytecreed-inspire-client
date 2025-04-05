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
import { LookUpView } from 'src/app/core/Models/common/look-up-view';
import { LookUpData } from 'src/app/core/Models/common/look-up-data';
import { getLookUpsAction } from 'src/app/store/common/look-up/look-up.action';
import { selectLookUpsView } from 'src/app/store/common/look-up/look-up.selector';
import { LookUpTableEnum } from 'src/app/core/enums/look-up-table';


@Component({
  selector: 'app-academic-periods',
  templateUrl: './academic-periods.component.html',
  styleUrl: './academic-periods.component.scss'
})
export class AcademicPeriodsComponent implements OnInit {
    breadCrumbItems!: Array<{}>;

    loading: boolean = false;
    submitted: boolean = false;

    lookUps?: LookUpView;
    activeAndInactiveStatus: LookUpData[] = [];
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
      private store: Store<{ data: RootReducerState }>
    ) {}


  ngOnInit(): void {
    this.getLookUps();
    this.getAcademicYears();
    this.getAcademicTerms();
    this.breadCrumbItems = [{ label: 'Configuration' },{ label: 'Academics'}, { label: 'Academic Periods', active: true }];

    this.academicPeriodForm = this.academicFormBuilder.group({
      id: [null],
      name: [null,[Validators.required]],
      isActive: [null, [Validators.required]],
      academicYearId: [null, [Validators.required]],
      academicTermId: [null, [Validators.required]],
    });

    this.getAcademicPeriods();

    this.academicPeriodForm.get('academicYearId')?.valueChanges.subscribe(() => {
      this.updatePeriodName();
    });
    
    this.academicPeriodForm.get('academicTermId')?.valueChanges.subscribe(() => {
      this.updatePeriodName();
    });
 }

 addModal(content: any) {
  this.isCreateMode = true;
  this.submitted = false;
  this.modalService.open(content, { size: 'md', centered: true });
}

  editModal(content: any, academicPeriod: AcademicPeriod) {
    this.isCreateMode = false;
    this.submitted = false;

    var data = {
      id: academicPeriod.id,
      name: academicPeriod.name,
      isActive: academicPeriod.isActive,
      academicYearId: academicPeriod.academicYearId,
      academicTermId: academicPeriod.academicTermId
    };
    this.academicPeriodForm.setValue(data);
    this.modalService.open(content, { size: 'md', centered: true });
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
    this.toggleLoading();
    this.submitted = true;
    if (this.academicPeriodForm.invalid) {
      this.toggleLoading();
      return;
    }
    
    this.modalService.dismissAll();

    if(this.isCreateMode){
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

  toggleLoading() {
    this.loading = !this.loading;
  }

  getStatusLabel(status: boolean): string {
    const statusCode = status ? 1 : 0;
    const statusItem = this.activeAndInactiveStatus.find(item => item.dataCode === statusCode);
    return statusItem?.text ?? '';
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

  updatePeriodName() {
    const academicYearId = this.academicPeriodForm.get('academicYearId')?.value;
    const academicTermId = this.academicPeriodForm.get('academicTermId')?.value;
  
    const academicYear = this.academicYears?.find(y => y.id === academicYearId);
    const academicTerm = this.academicTerms?.find(t => t.id === academicTermId);
  
    if (academicYear && academicTerm) {
      const name = `${academicTerm.name} - ${academicYear.name}`;
      this.academicPeriodForm.patchValue({ name });
    }
  }

}
