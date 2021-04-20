import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { CocoringCmsSectionActionsComponent } from './cocoring-cms-section-actions.component';

describe('CocoringCmsSectionActionsComponent', () => {
  let component: CocoringCmsSectionActionsComponent;
  let fixture: ComponentFixture<CocoringCmsSectionActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringCmsSectionActionsComponent],
      providers: [
        {
          provide: MAT_BOTTOM_SHEET_DATA,
          useValue: null
        },
        {
          provide: MatBottomSheetRef,
          useValue: { dismiss: () => { } }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringCmsSectionActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
