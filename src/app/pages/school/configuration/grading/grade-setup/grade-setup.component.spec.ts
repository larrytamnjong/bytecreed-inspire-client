import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeSetupComponent } from './grade-setup.component';

describe('GradeSetupComponent', () => {
  let component: GradeSetupComponent;
  let fixture: ComponentFixture<GradeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
