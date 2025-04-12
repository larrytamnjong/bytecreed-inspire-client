import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.scss'
})
export class StudentRegistrationComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  constructor( 
      protected override store: Store<{ data: RootReducerState }>, ) {
      super(store);
    }
    ngOnInit(): void {
      this.breadCrumbItems = [{label: 'Students'},{ label: 'Registration', active: true }];
    }
}
