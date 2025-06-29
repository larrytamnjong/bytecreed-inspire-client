import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';

@Component({
  selector: 'app-transcripts',
  templateUrl: './transcripts.component.html',
  styleUrl: './transcripts.component.scss'
})
export class TranscriptsComponent extends BaseComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  constructor( protected override store: Store<{ data: RootReducerState }>) {
         super(store);
   }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reporting' }, { label: 'Transcripts', active: true }];
  }

}
