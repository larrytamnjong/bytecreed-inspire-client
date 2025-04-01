import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-academic-terms',
  templateUrl: './academic-terms.component.html',
  styleUrl: './academic-terms.component.scss'
})
export class AcademicTermsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Configuration' },{ label: 'Academics'}, { label: 'Academic Term', active: true }];
}
}
