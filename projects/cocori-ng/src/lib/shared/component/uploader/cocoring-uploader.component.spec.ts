import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { UploaderService } from '../../../feature-core/core/service/uploader/uploader.service';
import { CocoringUploaderComponent } from './cocoring-uploader.component';

describe('CocoringUploadComponent', () => {
  let component: CocoringUploaderComponent;
  let fixture: ComponentFixture<CocoringUploaderComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringUploaderComponent],
      providers: [
        {
          provide: UploaderService
        },
        { provide: FormBuilder, useValue: formBuilder }
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringUploaderComponent);
    component = fixture.componentInstance;

    component.nameControl = "testControl"
    component.formGroup = formBuilder.group({
      testControl: null
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
