import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericPaginatedAppTableComponent } from './generic-paginated-app-table.component';

describe('GenericPaginatedAppTableComponent', () => {
  let component: GenericPaginatedAppTableComponent;
  let fixture: ComponentFixture<GenericPaginatedAppTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericPaginatedAppTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericPaginatedAppTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
