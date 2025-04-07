import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Configuration'},{ label: 'Course', active: true }];
  }
}
