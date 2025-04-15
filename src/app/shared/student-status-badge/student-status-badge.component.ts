import { Component, Input } from '@angular/core';
import { StudentStatusEnum } from 'src/app/core/enums/look-up-table';

@Component({
  selector: 'app-student-status-badge',
  templateUrl: './student-status-badge.component.html',
  styleUrl: './student-status-badge.component.scss'
})
export class StudentStatusBadgeComponent {
  @Input() status!: number;
  @Input() label?: string | null = '';

  get statusClass(): string {
    switch (this.status) {
      case StudentStatusEnum.Active:
        return 'bg-success-subtle text-success';
      case StudentStatusEnum.Graduated:
        return 'bg-primary-subtle text-primary';
      case StudentStatusEnum.DroppedOut:
        return 'bg-warning-subtle text-warning';
      case StudentStatusEnum.Expelled:
        return 'bg-danger-subtle text-danger';
      default:
        return 'bg-secondary-subtle text-secondary';
    }
  }
}
