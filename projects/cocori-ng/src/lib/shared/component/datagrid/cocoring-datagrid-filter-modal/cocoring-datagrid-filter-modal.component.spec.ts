import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { CocoringDatagridFilterModalComponent } from './cocoring-datagrid-filter-modal.component';

describe('CocoringDatagridFilterModalComponent', () => {
  let component: CocoringDatagridFilterModalComponent;
  let fixture: ComponentFixture<CocoringDatagridFilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringDatagridFilterModalComponent],
      imports: [MatDialogModule, ReactiveFormsModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: MatDialogRef,
          useValue: { close: (dialogResult: any) => { } }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
