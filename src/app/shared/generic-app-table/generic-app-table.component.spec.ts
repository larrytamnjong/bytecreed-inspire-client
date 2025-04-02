import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericAppTableComponent } from './generic-app-table.component';

describe('AppTableComponent', () => {
  let component: GenericAppTableComponent;
  let fixture: ComponentFixture<GenericAppTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericAppTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericAppTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
