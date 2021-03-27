import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FileModel } from '../../../../core/model/component-uploader.model';

import { CocoringUploaderBottomSheetComponent } from './cocoring-uploader-bottom-sheet.component';

describe('CocoringUploaderBottomSheetComponent', () => {
  let component: CocoringUploaderBottomSheetComponent;
  let fixture: ComponentFixture<CocoringUploaderBottomSheetComponent>;
  let file: FileModel;

  beforeEach(async () => {
    file = { description: 'test', 'fileName': 'test' }

    await TestBed.configureTestingModule({
      declarations: [CocoringUploaderBottomSheetComponent],
      providers: [
        {
          provide: MAT_BOTTOM_SHEET_DATA,
          useValue: { 'file': file, 'component': null }
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
    fixture = TestBed.createComponent(CocoringUploaderBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
