import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicTermsComponent } from './academic-terms.component';

describe('AcademicTermsComponent', () => {
  let component: AcademicTermsComponent;
  let fixture: ComponentFixture<AcademicTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicTermsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
