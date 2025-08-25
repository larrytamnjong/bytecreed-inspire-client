import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypeBadgeComponent } from './payment-type-badge.component';

describe('PaymentTypeBadgeComponent', () => {
  let component: PaymentTypeBadgeComponent;
  let fixture: ComponentFixture<PaymentTypeBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentTypeBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTypeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
