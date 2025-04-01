import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/core/services/general/pagination.service';
import { cloneDeep } from 'lodash';
import { UntypedFormBuilder, Validators, UntypedFormGroup} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';

@Component({
  selector: 'app-exam-types',
  templateUrl: './exam-types.component.html',
  styleUrl: './exam-types.component.scss'
})
export class ExamTypesComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  constructor(){}

  ngOnInit(): void {
      this.breadCrumbItems = [{ label: 'Configuration' },{ label: 'Exam Types', active: true }];
  }
}
