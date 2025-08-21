import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-journals',
  templateUrl: './journals.component.html',
  styleUrl: './journals.component.scss'
})
export class JournalsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  loading: boolean = false; 
  ngOnInit(): void {
  this.breadCrumbItems = [{label: 'Accounting'},{ label: 'Journals', active: true }];
  }
}
