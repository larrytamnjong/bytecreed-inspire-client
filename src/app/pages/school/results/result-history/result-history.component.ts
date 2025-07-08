import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';

@Component({
  selector: 'app-result-history',
  templateUrl: './result-history.component.html',
  styleUrl: './result-history.component.scss'
})
export class ResultHistoryComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  constructor( protected override store: Store<{ data: RootReducerState }>) {
        super(store);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Results' }, { label: 'Achieve', active: true }];
  }

}
