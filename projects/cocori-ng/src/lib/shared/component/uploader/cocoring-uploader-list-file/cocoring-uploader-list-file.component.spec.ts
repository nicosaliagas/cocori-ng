import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { ConfigAPIsFile, FileModel } from '../../../../core/model/component-uploader.model';
import { UploaderService } from '../../../../core/service/uploader/uploader.service';
import { CocoringFileSizeModule } from '../../../pipe/file-size/cocoring-file-size.module';
import { CocoringUploaderListFileComponent } from './cocoring-uploader-list-file.component';

describe('CocoringUploaderListFileComponent', () => {
  let component: CocoringUploaderListFileComponent;
  let fixture: ComponentFixture<CocoringUploaderListFileComponent>;
  let uploaderService: UploaderService
  let httpServiceSpy: { upload: jasmine.Spy };
  const formBuilder: FormBuilder = new FormBuilder();
  let apisFile: ConfigAPIsFile;
  let file: FileModel

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringUploaderListFileComponent],
      imports: [MatMenuModule, HttpClientTestingModule, CocoringFileSizeModule, MatDialogModule, MatBottomSheetModule],
      providers: [{ provide: FormBuilder, useValue: formBuilder }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringUploaderListFileComponent);
    component = fixture.componentInstance;

    httpServiceSpy = jasmine.createSpyObj('HttpService', ['upload']);

    uploaderService = new UploaderService(httpServiceSpy as any)

    file = { id: 'id', description: 'test', fileName: 'name', 'size': 30, 'mimeType': 'image/jpeg' }
    apisFile = {
      apiFile: (fileId) => {
        return `url1-${fileId}`
      },
      apiFileDownload: (fileId) => {
        return `url2-${fileId}`
      }
    }

    component.fileModel = file
    component.apisFile = apisFile
    component.nameControl = "testControl"
    component.formGroup = formBuilder.group({
      testControl: new FormArray([])
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
