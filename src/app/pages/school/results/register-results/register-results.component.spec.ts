import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterResultsComponent } from './register-results.component';

describe('RegisterResultsComponent', () => {
  let component: RegisterResultsComponent;
  let fixture: ComponentFixture<RegisterResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
