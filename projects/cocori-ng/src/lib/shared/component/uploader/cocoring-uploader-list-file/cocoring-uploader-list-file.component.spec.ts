import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';

import { FileModel } from '../../../../core/model/component-uploader.model';
import { UploaderService } from '../../../../core/service/uploader/uploader.service';
import { CocoringFileSizeModule } from '../../../pipe/file-size/cocoring-file-size.module';
import { CocoringUploaderListFileComponent } from './cocoring-uploader-list-file.component';

describe('CocoringUploaderListFileComponent', () => {
  let component: CocoringUploaderListFileComponent;
  let fixture: ComponentFixture<CocoringUploaderListFileComponent>;
  let uploaderService: UploaderService
  let httpServiceSpy: { upload: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringUploaderListFileComponent],
      imports: [MatMenuModule, HttpClientTestingModule, CocoringFileSizeModule],
      providers: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringUploaderListFileComponent);
    component = fixture.componentInstance;

    httpServiceSpy = jasmine.createSpyObj('HttpService', ['upload']);

    uploaderService = new UploaderService(httpServiceSpy as any)

    const file: FileModel = { id: 'id', fileName: 'name', 'size': 30, 'fileType': 'image' }

    component.fileModel = file

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
