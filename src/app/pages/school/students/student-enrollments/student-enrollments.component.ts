import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';

@Component({
  selector: 'app-student-enrollments',
  templateUrl: './student-enrollments.component.html',
  styleUrl: './student-enrollments.component.scss'
})
export class StudentEnrollmentsComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  constructor( 
        protected override store: Store<{ data: RootReducerState }>, ) {
        super(store);
      }
      ngOnInit(): void {
        this.breadCrumbItems = [{label: 'Students'},{ label: 'Enrollment', active: true }];
      }
}
