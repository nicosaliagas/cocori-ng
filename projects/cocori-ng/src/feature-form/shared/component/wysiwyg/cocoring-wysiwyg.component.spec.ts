import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';

import { WysiwygService } from '../../../../feature-core/service/wysiwyg.service';
import { CocoringWysiwygComponent } from './cocoring-wysiwyg.component';

describe('CocoringWysiwygComponent', () => {
  let component: CocoringWysiwygComponent;
  let fixture: ComponentFixture<CocoringWysiwygComponent>;
  let wysiwygService: WysiwygService
  const formBuilder: UntypedFormBuilder = new UntypedFormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringWysiwygComponent],
      providers: [
        {
          provide: WysiwygService
        },
        { provide: UntypedFormBuilder, useValue: formBuilder }
      ],
      imports: [HttpClientTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringWysiwygComponent);
    component = fixture.componentInstance;

    wysiwygService = TestBed.inject(WysiwygService);

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
