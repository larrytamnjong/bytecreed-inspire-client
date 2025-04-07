import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingSystemsComponent } from './grading-systems.component';

describe('GradingSystemsComponent', () => {
  let component: GradingSystemsComponent;
  let fixture: ComponentFixture<GradingSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradingSystemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradingSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
