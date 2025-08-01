import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { ResultReportService } from 'src/app/core/services/api/result-report.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ClassSectionService } from 'src/app/core/services/api/class-section.service';
import { ClassService } from 'src/app/core/services/api/class.service';
import { AcademicService } from 'src/app/core/services/api/academics.service';
import { jsPDF } from "jspdf";
import { finalize } from 'rxjs';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';

@Component({
  selector: 'app-master-sheets',
  templateUrl: './master-sheets.component.html',
  styleUrl: './master-sheets.component.scss'
})
export class MasterSheetsComponent extends BaseComponent {
  breadCrumbItems!: Array<{}>;

  classes: any = [];
  classSections: any = [];
  academicPeriods: any = [];
  academicYears: any = [];

  getMasterSheetForm!: UntypedFormGroup;

  isFormValid: boolean = false;

  constructor(
    private reportService: ResultReportService,
    private classSectionService: ClassSectionService,
    private classService: ClassService,
    private academicService: AcademicService,
    protected override store: Store<{ data: RootReducerState }>,
    private getMasterSheetFormBuilder: UntypedFormBuilder
  ) {
    super(store);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reporting' }, { label: 'Master Sheets', active: true }];

    this.getMasterSheetForm = this.getMasterSheetFormBuilder.group({
      academicYearId: [null, [Validators.required]],
      classIds: [null, [Validators.required]],
      classSectionIds: [null],
      academicPeriodId: [null, [Validators.required]]
    });

    this.getMasterSheetForm.statusChanges.subscribe(status => {
      this.isFormValid = status === 'VALID';
    });

    this.getMasterSheetForm.get("academicYearId")?.valueChanges.subscribe((value) => {
      if (value) {
        this.clearChildFormProperties();
        this.getClasses(value);
        this.getClassSections(value);
        this.getAcademicPeriods(value);
      } 
    });
    
    this.getAcademicYears();
  } 


  getMasterSheets(){
    if(this.getMasterSheetForm.invalid){
      return;
    }

    this.toggleLoading();
    this.reportService.getMasterSheets(this.getMasterSheetForm.value).pipe(finalize(() => {this.toggleLoading()})).subscribe({
      next: (response) => {
        if(response.success)
          {
            console.log(response);
          }
      },
      error: (error) => {
        SimpleAlerts.showError(getErrorMessage(error));
      },
    });
  }

   getClassSections(academicYearId?: any){
    this.classSectionService.getClassSections(academicYearId).subscribe({
      next: (response) => {
        if(response.success){
          this.classSections = response.data;
        }
      },
      error: (error) => {
      }
    })
  }

   getClasses(academicYearId?: any) {
    this.classService.getClasses(academicYearId).subscribe({
      next: (response) => {
        if(response.success){
          this.classes = response.data;
        }
      },
      error: (error) => {
      }
    })
  }

   getAcademicPeriods(academicYearId?: any) {
    this.academicService.getAcademicPeriods(academicYearId).subscribe({
      next: (response) => {
        if(response.success){
          this.academicPeriods = response.data;
        }
      },
      error: (error) => {
      }
    })
  }

  getAcademicYears(){
    this.academicService.getAcademicYears().subscribe({
      next: (response) => {
        if(response.success){
          this.academicYears = response.data;
        }
      },
      error: (error) => {
      }
    })
  }

  clearChildFormProperties() {
    this.classes = [];
    this.classSections = [];
    this.getMasterSheetForm.patchValue({classId: null, classSectionId: null, academicPeriodId: null});
  }

}
