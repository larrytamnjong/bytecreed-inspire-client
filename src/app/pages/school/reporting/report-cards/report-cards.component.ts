import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
@Component({
  selector: 'app-report-cards',
  templateUrl: './report-cards.component.html',
  styleUrl: './report-cards.component.scss'
})
export class ReportCardsComponent extends BaseComponent {
  breadCrumbItems!: Array<{}>;

  constructor(protected override store: Store<{ data: RootReducerState }>) {
    super(store);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reporting' }, { label: 'Report Cards', active: true }];
  }

}
