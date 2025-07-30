import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSheetsComponent } from './master-sheets.component';

describe('MasterSheetsComponent', () => {
  let component: MasterSheetsComponent;
  let fixture: ComponentFixture<MasterSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterSheetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
