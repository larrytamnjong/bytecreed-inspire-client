import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrl: './audit-logs.component.scss'
})
export class AuditLogsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  loading: boolean = false; 
  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Users'},{ label: 'Logs', active: true }];
  }
}

