import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';

import { ConfigAPIsFile, FileModel } from '../../../../feature-core/core/model/component-uploader.model';
import { UploaderService } from '../../../../feature-core/core/service/uploader/uploader.service';
import { CocoringFileSizeModule } from '../../../pipe/file-size/cocoring-file-size.module';
import { CocoringUploaderListFileComponent } from './cocoring-uploader-list-file.component';

describe('CocoringUploaderListFileComponent', () => {
  let component: CocoringUploaderListFileComponent;
  let fixture: ComponentFixture<CocoringUploaderListFileComponent>;
  let uploaderService: UploaderService
  let testbedService: UploaderService
  let httpServiceSpy: { upload: jasmine.Spy };
  const formBuilder: FormBuilder = new FormBuilder();
  let apisFile: ConfigAPIsFile;
  let file: FileModel

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringUploaderListFileComponent],
      imports: [MatMenuModule, HttpClientTestingModule, CocoringFileSizeModule, MatDialogModule, MatBottomSheetModule],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: UploaderService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringUploaderListFileComponent);
    component = fixture.componentInstance;

    httpServiceSpy = jasmine.createSpyObj('HttpService', ['upload']);

    uploaderService = new UploaderService(httpServiceSpy as any)

    spyOn(uploaderService, 'uploadFile').and.returnValue(null)

    testbedService = TestBed.inject(UploaderService)

    apisFile = {
      apiFile: (fileId) => {
        return `url1-${fileId}`
      },
      apiFileDownload: (fileId) => {
        return `url2-${fileId}`
      }
    }

    component.apisFile = apisFile

    component.nameControl = "testControl"

    component.formGroup = formBuilder.group({
      testControl: new FormArray([])
    });

    component.uploaderService = uploaderService
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /** le inject est juste pour l'exemple */
  it('when we upload a new file, should reset previous value from the form array', inject([UploaderService], (injectService: UploaderService) => {

    expect(injectService).toBe(testbedService)

    file = { description: 'test', fileName: 'name', 'size': 30, 'mimeType': 'image/jpeg' }

    component.fileModel = file

    fixture.detectChanges();

    component.uploaderService.fileUploaded$.next('1')

    expect(component.fileModel.id).toEqual('1')
    expect(component.fileFormControl.value).toEqual('1')

    expect(component.upoaderFormArray.length).toEqual(1)

    /** upload a new file */

    component.uploaderService.fileUploaded$.next('2')

    expect(component.upoaderFormArray.length).toEqual(1)
  })
  )

  it('should open browse window when click on a empty file from the list', () => {
    file = { description: 'test' }

    component.fileModel = file

    spyOn(component, 'browseFile');

    fixture.detectChanges();

    const optionList: DebugElement = fixture.debugElement.query(By.css('#optionList'));

    optionList.triggerEventHandler('click', null);

    expect(component.browseFile).toHaveBeenCalled()
  })

  it('file change event should arrive in handler', () => {

    file = { description: 'test' }

    component.fileModel = file

    fixture.detectChanges();

    const getFileList = () => {
      const blob = new Blob([""], { type: "image/png" });

      blob["lastModifiedDate"] = "";
      blob["name"] = "filename.png";

      const file = <File>blob;
      const fileList: FileList = {
        0: file,
        length: 1,
        item: (index: number) => file
      };
      return fileList;
    };

    component.emitFiles(getFileList())

    expect(component.isUploading).toBeTrue()

    expect(component.fileModel.fileName).toEqual("filename.png")
    expect(component.fileModel.mimeType).toEqual("image/png")
    expect(component.fileType).toEqual("image")
  })


  it('should display correct informations of an empty file from the list', () => {
    file = { description: 'description file' }

    component.fileModel = file

    fixture.detectChanges();

    const fileInfo: DebugElement = fixture.debugElement.query(By.css('.mat-list-text span'));
    const fileMatIcon: DebugElement = fixture.debugElement.query(By.css('.file-doc mat-icon'));

    expect(fileInfo.nativeElement.textContent).toEqual('description file');
    expect(fileMatIcon.nativeElement.textContent).toEqual('upload_file');
  })

  it('should display the file uploaded in the list', () => {
    file = { id: 'fileId', dateUpload: new Date(), size: 82.12, mimeType: 'image/jpeg', fileName: 'new-file.png', description: 'description file' }

    component.fileModel = file

    fixture.detectChanges();

    const fileImage: DebugElement = fixture.debugElement.query(By.css('.file-image'));
    const fileSize: DebugElement = fixture.debugElement.query(By.css('.subtext > span'));
    const fileInfo: DebugElement = fixture.debugElement.query(By.css('.mat-list-text span'));
    const fileMatIcon: DebugElement = fixture.debugElement.query(By.css('.file-doc mat-icon'));

    expect(fileInfo.nativeElement.textContent).toEqual('new-file.png');
    expect(fileSize.nativeElement.textContent).toEqual('82.12 octets');
    expect(fileImage).toBeTruthy()
    expect(fileMatIcon).toBeFalsy()
  })

  it('should display the bottom sheet', () => {
    file = { id: 'fileId', dateUpload: new Date(), size: 82.12, mimeType: 'image/jpeg', fileName: 'new-file.png', description: 'description file' }

    component.fileModel = file

    const theSpy = spyOn(component, 'openBottomSheet');
    
    const listOption: DebugElement = fixture.debugElement.query(By.css('mat-list-option'));
    
    listOption.triggerEventHandler('click', null);
    
    fixture.detectChanges();
    
    expect(theSpy).toHaveBeenCalled();
  })
});
