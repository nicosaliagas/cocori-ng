import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DebugElement, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { By } from '@angular/platform-browser';

import { ConfigAPIsFile, FileModel } from '../../../../feature-core/core/model/component-uploader.model';
import { CocoringFileSizeModule } from '../../../pipe/file-size/cocoring-file-size.module';
import { CocoringUploaderBottomSheetComponent } from './cocoring-uploader-bottom-sheet.component';

registerLocaleData(localeFr);

describe('CocoringUploaderBottomSheetComponent', () => {
  let component: CocoringUploaderBottomSheetComponent;
  let fixture: ComponentFixture<CocoringUploaderBottomSheetComponent>;

  let apisFile: ConfigAPIsFile;
  let file: FileModel

  beforeEach(async () => {
    file = { size: 82.12, dateUpload: new Date('11/11/2021 11:11'), description: 'file description', 'fileName': 'filename.jpg' }

    await TestBed.configureTestingModule({
      declarations: [CocoringUploaderBottomSheetComponent],
      imports: [CocoringFileSizeModule],
      providers: [
        {
          provide: MAT_BOTTOM_SHEET_DATA,
          useValue: { 'file': file, 'component': null }
        },
        { provide: LOCALE_ID, useValue: 'fr-FR' },
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

    apisFile = {
      apiFile: (fileId) => {
        return `url1-${fileId}`
      },
      apiFileDownload: (fileId) => {
        return `url2-${fileId}`
      }
    }

  });

  it('should create', () => {
    expect(component).toBeTruthy();

    expect(component.data.file.description).toEqual("file description")
    expect(component.data.file.fileName).toEqual("filename.jpg")
  });

  it('should display informations about the file entry', () => {
    fixture.detectChanges();

    const description: DebugElement = fixture.debugElement.query(By.css('.description-file'));
    const filename: DebugElement = fixture.debugElement.query(By.css('.filename'));
    const size: DebugElement = fixture.debugElement.query(By.css('.description-size'));
    const date: DebugElement = fixture.debugElement.query(By.css('.date-upload span'));

    expect(description.nativeElement.textContent).toEqual('file description')
    expect(filename.nativeElement.textContent).toEqual('filename.jpg')
    expect(size.nativeElement.textContent).toEqual('82.12 octets')
    expect(date.nativeElement.textContent).toEqual('11/11/2021, 11:11')
  });
});
