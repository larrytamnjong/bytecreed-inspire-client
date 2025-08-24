import { Component, Input } from '@angular/core';
import { PaymentStatusEnum } from 'src/app/core/enums/look-up-table';

@Component({
  selector: 'app-payment-status-badge',
  templateUrl: './payment-status-badge.component.html',
  styleUrl: './payment-status-badge.component.scss'
})
export class PaymentStatusBadgeComponent {
  @Input() status!: number;
  @Input() label?: string | null = '';

  get statusClass(): string {
    switch (this.status) {
      case PaymentStatusEnum.Completed:
        return 'bg-success-subtle text-success';
      case PaymentStatusEnum.Processing:
        return 'bg-primary-subtle text-primary';
      case PaymentStatusEnum.Cancelled:
        return 'bg-danger-subtle text-danger';
      case PaymentStatusEnum.Rejected:
        return 'bg-danger-subtle text-danger';
      default:
        return 'bg-secondary-subtle text-secondary';
    }
  }
}
