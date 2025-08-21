import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentArchiveComponent } from './payment-archive.component';

describe('PaymentArchiveComponent', () => {
  let component: PaymentArchiveComponent;
  let fixture: ComponentFixture<PaymentArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentArchiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
