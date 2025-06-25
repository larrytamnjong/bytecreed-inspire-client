import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { BaseComponent } from 'src/app/shared/base.component';
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent extends BaseComponent implements OnInit{
 breadCrumbItems!: Array<{}>;

    constructor(protected override store: Store<{ data: RootReducerState }>) {
        super(store);
      }

      ngOnInit(): void {
         this.breadCrumbItems = [{label: 'Personnel'},{ label: 'Teachers', active: true }]
      }
}
