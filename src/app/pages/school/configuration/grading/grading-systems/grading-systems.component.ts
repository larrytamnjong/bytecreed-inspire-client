import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grading-systems',
  templateUrl: './grading-systems.component.html',
  styleUrl: './grading-systems.component.scss'
})
export class GradingSystemsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Grading'},{ label: 'Grading Systems', active: true }];
  }
}
