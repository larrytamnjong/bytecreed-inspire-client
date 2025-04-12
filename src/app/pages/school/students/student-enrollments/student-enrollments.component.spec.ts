import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrollmentsComponent } from './student-enrollments.component';

describe('StudentEnrollmentsComponent', () => {
  let component: StudentEnrollmentsComponent;
  let fixture: ComponentFixture<StudentEnrollmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentEnrollmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
