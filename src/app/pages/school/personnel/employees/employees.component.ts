import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent extends BaseComponent implements OnInit{
 breadCrumbItems!: Array<{}>;

    constructor(protected override store: Store<{ data: RootReducerState }>) {
        super(store);
      }

      ngOnInit(): void {
         this.breadCrumbItems = [{label: 'Personnel'},{ label: 'Employees', active: true }]
      }
}