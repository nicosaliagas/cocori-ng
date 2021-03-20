import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { UploaderService } from '../../../core/service/uploader/uploader.service';
import { CocoringUploaderComponent } from './cocoring-uploader.component';

describe('CocoringUploadComponent', () => {
  let component: CocoringUploaderComponent;
  let fixture: ComponentFixture<CocoringUploaderComponent>;
  let uploadService: UploaderService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringUploaderComponent],
      providers: [
        {
          provide: UploaderService
        },
        FormBuilder
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringUploaderComponent);
    component = fixture.componentInstance;

    uploadService = TestBed.inject(UploaderService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
