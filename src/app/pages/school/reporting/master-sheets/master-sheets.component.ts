import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { ResultReportService } from 'src/app/core/services/api/result-report.service';

@Component({
  selector: 'app-master-sheets',
  templateUrl: './master-sheets.component.html',
  styleUrl: './master-sheets.component.scss'
})
export class MasterSheetsComponent extends BaseComponent {
  breadCrumbItems!: Array<{}>;

  constructor(
    private resultReportService: ResultReportService,
    protected override store: Store<{ data: RootReducerState }>) {
    super(store);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reporting' }, { label: 'Master Sheets', active: true }];
  } 

}
