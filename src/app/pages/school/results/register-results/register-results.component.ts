import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';

@Component({
  selector: 'app-register-results',
  templateUrl: './register-results.component.html',
  styleUrl: './register-results.component.scss'
})
export class RegisterResultsComponent extends BaseComponent implements OnInit {
 breadCrumbItems!: Array<{}>;


  constructor( protected override store: Store<{ data: RootReducerState }>) {
        super(store);
  }

  ngOnInit(): void {
      this.breadCrumbItems = [{label: 'Results'},{ label: 'Register', active: true }];
  }


}
