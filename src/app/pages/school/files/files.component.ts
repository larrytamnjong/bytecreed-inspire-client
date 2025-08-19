import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent  implements OnInit {
  breadCrumbItems!: Array<{}>;

  loading: boolean = false; 
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Files', active: true }];
  }
}
