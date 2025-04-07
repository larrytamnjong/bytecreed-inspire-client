import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Configuration'},{ label: 'Subject', active: true }];
  }
}
