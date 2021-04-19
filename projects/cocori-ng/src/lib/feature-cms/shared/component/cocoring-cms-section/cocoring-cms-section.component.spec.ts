import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { WysiwygSectionCmsModel } from '../../../core/model/cms.model';
import { CocoringCmsSectionComponent } from './cocoring-cms-section.component';

describe('CocoringCmsSectionComponent', () => {
  let component: CocoringCmsSectionComponent;
  let fixture: ComponentFixture<CocoringCmsSectionComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringCmsSectionComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringCmsSectionComponent);
    component = fixture.componentInstance;

    const apisFile = {
      apiFile: (fileId) => {
        return `url1-${fileId}`
      },
      apiFileDownload: (fileId) => {
        return `url2-${fileId}`
      }
    }

    const wysiwyg: WysiwygSectionCmsModel = {
      apiKey: 'apikey',
      apiFile: apisFile.apiFile,
      apiFileDownload: apisFile.apiFileDownload,
    }

    component.wysiwyg = wysiwyg

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
