import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetModule, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FileModel } from '../../../../core/model/component-uploader.model';

import { CocoringUploaderFileActionsComponent } from './cocoring-uploader-file-actions.component';

describe('CocoringUploaderFileActionsComponent', () => {
  let component: CocoringUploaderFileActionsComponent;
  let fixture: ComponentFixture<CocoringUploaderFileActionsComponent>;
  let file: FileModel;

  beforeEach(async () => {
    file = { description: 'test', 'fileName': 'test' }

    await TestBed.configureTestingModule({
      declarations: [CocoringUploaderFileActionsComponent],
      imports: [],
      providers: [
        {
          provide: MAT_BOTTOM_SHEET_DATA,
          useValue: { 'file': file }
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
    fixture = TestBed.createComponent(CocoringUploaderFileActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
