import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericAppSmartTableComponent } from './generic-app-smart-table.component';

describe('GenericAppSmartTableComponent', () => {
  let component: GenericAppSmartTableComponent;
  let fixture: ComponentFixture<GenericAppSmartTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericAppSmartTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericAppSmartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
