import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { CocoringWysiwygComponent } from './cocoring-wysiwyg.component';

describe('CocoringWysiwygComponent', () => {
  let component: CocoringWysiwygComponent;
  let fixture: ComponentFixture<CocoringWysiwygComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringWysiwygComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilder }
      ],
      imports: [HttpClientTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringWysiwygComponent);
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
