import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { ResultReportService } from 'src/app/core/services/api/result-report.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/core/services/api/class.service';
import { AcademicService } from 'src/app/core/services/api/academics.service';
import { finalize } from 'rxjs';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';

@Component({
  selector: 'app-transcripts',
  templateUrl: './transcripts.component.html',
  styleUrl: './transcripts.component.scss'
})
export class TranscriptsComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  students: any = [];
  academicYears: any = [];
  classes: any  = [];
  selectedStudentIds: any[] = [];
  reloadTable: boolean = false;

   headers: any = [
    { key: 'familyName', displayName: 'Family Name' },
    { key: 'givenNames', displayName: 'Given Names'}, 
    { key: 'dateOfBirth', displayName: 'Date Of Birth' },
    { key: 'sex', displayName: 'Sex' },
    { key: 'admissionNumber', displayName: 'Admission Number' },
    { key: 'status', displayName: 'Status' },
  ]


  getTranscriptsForm!: UntypedFormGroup;
  constructor( 
    private reportService: ResultReportService,
    private getTranscriptsFormBuilder: UntypedFormBuilder,
    private classService: ClassService,
    private academicService: AcademicService,
    protected override store: Store<{ data: RootReducerState }>) {
         super(store);
   }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reporting' }, { label: 'Transcripts', active: true }];

    this.getTranscriptsForm = this.getTranscriptsFormBuilder.group({
      studentIds: [null, [Validators.required]],
      academicYearIds: [null, [Validators.required]]
    });

    this.getAcademicYears();
    this.getClasses();
    this.getLookUps();
  }

  getTranscripts(){

    this.getTranscriptsForm.patchValue({studentIds: this.selectedStudentIds});

   if(this.getTranscriptsForm.invalid){
     SimpleAlerts.showWarning();
    return;
   }
   this.toggleLoading();
   this.reportService.getTranscripts(this.getTranscriptsForm.value).pipe(
    finalize(() =>{ 
      this.toggleLoading()
    })).subscribe({
      next: (response) => {
        if(response.success)
          {
          console.log(response.data);
          }
      },
      error: (error) => {
        SimpleAlerts.showError(getErrorMessage(error));
      },
    });
  }

  getClasses() {
    this.classService.getClasses().subscribe({
      next: (response) => {
        if(response.success)
          { 
            this.classes = response.data;
          }
      },
      error: () => {},
    });
  }

  getAcademicYears() {
    this.academicService.getAcademicYears().subscribe({
      next: (response) => {
        if(response.success)
          { 
            this.academicYears = response.data;
          }
      },
      error: () => {},
    });
  }

  onSelectedRowsChange(event: any){
   this.selectedStudentIds = event;
  }

}
