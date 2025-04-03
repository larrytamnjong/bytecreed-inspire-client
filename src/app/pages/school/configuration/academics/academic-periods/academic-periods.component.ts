import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-academic-periods',
  templateUrl: './academic-periods.component.html',
  styleUrl: './academic-periods.component.scss'
})
export class AcademicPeriodsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Configuration' },{ label: 'Academics'}, { label: 'Academic Periods', active: true }];
}
}
