import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grade-setup',
  templateUrl: './grade-setup.component.html',
  styleUrl: './grade-setup.component.scss'
})
export class GradeSetupComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Grading'},{ label: 'Grade Setup', active: true }];
  }
}
