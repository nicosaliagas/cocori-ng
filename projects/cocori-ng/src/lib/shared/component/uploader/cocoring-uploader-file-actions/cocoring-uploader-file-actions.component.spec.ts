import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { ConfigAPIsFile, FileModel } from '../../../../feature-core/core/model/component-uploader.model';
import { CocoringUploaderFileActionsComponent } from './cocoring-uploader-file-actions.component';

describe('CocoringUploaderFileActionsComponent', () => {
  let component: CocoringUploaderFileActionsComponent;
  let fixture: ComponentFixture<CocoringUploaderFileActionsComponent>;
  let file: FileModel;
  let apisFile: ConfigAPIsFile;

  beforeEach(async () => {
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

    file = { id: 'fileId', description: 'test', fileName: 'test' }

    apisFile = {
      apiFile: (fileId) => {
        return `url1-${fileId}`
      },
      apiFileDownload: (fileId) => {
        return `url2-${fileId}`
      }
    }

    component.file = file
    component.apisFile = apisFile

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    expect(component.apiFile).toEqual('url1-fileId')

    expect(component.apiFileDownload).toEqual('url2-fileId')
  });
});
