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
      classIds: [null, [Validators.required]],
      classSectionIds: [null, ],
      academicPeriodId: [null, [Validators.required]]
    });

    this.getMasterSheetForm.statusChanges.subscribe(status => {
      this.isFormValid = status === 'VALID';
    });
    
    this.getClasses();
    this.getAcademicPeriods();
    this.getClassSections();
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

  getClassSections(){
    this.classSectionService.getClassSections().subscribe({
      next: (response) => {
        if(response.success){
          this.classSections = response.data;
        }
      },
      error: () => {},
    })
  }

  getClasses() {
    this.classService.getClasses().subscribe({
      next: (response) => {
        if(response.success){
          this.classes = response.data;
        }
      },
      error: () => {},
    })
  }

  getAcademicPeriods() {
    this.academicService.getAcademicPeriods().subscribe({
      next: (response) => {
        if(response.success){
          this.academicPeriods = response.data;
        }
      },
      error: () => {},
    })
  }

}
