import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { ResultReportService } from 'src/app/core/services/api/result-report.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transcripts',
  templateUrl: './transcripts.component.html',
  styleUrl: './transcripts.component.scss'
})
export class TranscriptsComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  students: any[] = [];
  academicYears: any[] = [];

  getTranscriptsForm!: UntypedFormGroup;
  constructor( 
    private reportService: ResultReportService,
    private getTranscriptsFormBuilder: UntypedFormBuilder,
    protected override store: Store<{ data: RootReducerState }>) {
         super(store);
   }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reporting' }, { label: 'Transcripts', active: true }];

    this.getTranscriptsForm = this.getTranscriptsFormBuilder.group({
      studentIds: [null, [Validators.required]],
      academicYearIds: [null, [Validators.required]]
    });
  }

  getTranscripts(){

  }

}
