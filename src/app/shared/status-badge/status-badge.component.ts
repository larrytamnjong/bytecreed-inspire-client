import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss'
})
export class StatusBadgeComponent {
  @Input() status: boolean | null = null;
  @Input() label?: string | null = '';

  get statusClass(): string {
    return this.status === true ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger';
  }
}
