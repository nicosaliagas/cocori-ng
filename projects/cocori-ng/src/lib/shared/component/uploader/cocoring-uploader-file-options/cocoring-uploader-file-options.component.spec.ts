import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileModel } from '../../../../core/model/component-uploader.model';

import { CocoringUploaderFileOptionsComponent } from './cocoring-uploader-file-options.component';

describe('CocoringUploaderFileOptionsComponent', () => {
  let component: CocoringUploaderFileOptionsComponent;
  let fixture: ComponentFixture<CocoringUploaderFileOptionsComponent>;

  let file: FileModel;

  beforeEach(async () => {

    file = { description: 'test', 'fileName': 'test' }

    await TestBed.configureTestingModule({
      declarations: [CocoringUploaderFileOptionsComponent],
      imports: [],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { 'file': file }
        },
        {
          provide: MatDialogRef,
          useValue: { close: (dialogResult: any) => { } }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringUploaderFileOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
