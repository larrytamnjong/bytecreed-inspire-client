import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { ResultReportService } from 'src/app/core/services/api/result-report.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ClassSectionService } from 'src/app/core/services/api/class-section.service';
import { ClassService } from 'src/app/core/services/api/class.service';
import { AcademicService } from 'src/app/core/services/api/academics.service';
import { finalize } from 'rxjs';

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

  getTranscriptsForm!: UntypedFormGroup;
  constructor( 
    private reportService: ResultReportService,
    private getTranscriptsFormBuilder: UntypedFormBuilder,
    private classSectionService: ClassSectionService,
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
  }

  getTranscripts(){
   if(this.getTranscriptsForm.invalid){
    return;
   }

   this.reportService.getTranscripts(this.getTranscriptsForm.value).pipe(finalize(() => {
      this.getTranscriptsForm.reset();
    })).subscribe({
      next: (response) => {
        if(response.success)
          {
            this.students = response.data;
          }
      },
      error: () => {},
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

}
