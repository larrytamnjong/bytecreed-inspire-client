import { Component, Input } from '@angular/core';
import { PaymentTypesEnum, StudentStatusEnum } from 'src/app/core/enums/look-up-table';

@Component({
  selector: 'app-payment-type-badge',
  templateUrl: './payment-type-badge.component.html',
  styleUrl: './payment-type-badge.component.scss'
})
export class PaymentTypeBadgeComponent {
  @Input() status!: number;
  @Input() label?: string | null = '';

  get statusClass(): string {
    switch (this.status) {
      case PaymentTypesEnum.Income:
        return 'bg-success-subtle text-success';
      case PaymentTypesEnum.Expense:
        return 'bg-danger-subtle text-danger';
      case PaymentTypesEnum.Refund:
        return 'bg-warning-subtle text-danger';
      case PaymentTypesEnum.SchoolFees:
        return 'bg-success-subtle text-success';
      default:
        return 'bg-secondary-subtle text-secondary';
    }
  }
}
