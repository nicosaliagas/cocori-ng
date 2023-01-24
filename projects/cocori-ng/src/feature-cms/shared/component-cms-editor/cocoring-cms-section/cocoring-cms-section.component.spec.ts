import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';

import { ApisConfigCmsModel, SectionModel } from '../../../core/model/cms.model';
import { CenterZoneTplComponent } from '../cocoring-cms-section-templates/center-zone-tpl/center-zone-tpl.component';
import { CocoringCmsSectionComponent } from './cocoring-cms-section.component';

describe('CocoringCmsSectionComponent', () => {
  let component: CocoringCmsSectionComponent;
  let fixture: ComponentFixture<CocoringCmsSectionComponent>;
  const formBuilder: UntypedFormBuilder = new UntypedFormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringCmsSectionComponent],
      providers: [
        { provide: UntypedFormBuilder, useValue: formBuilder },
        Overlay
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

    const wysiwyg: ApisConfigCmsModel = {
      apiKey: 'apikey',
      apiFile: apisFile.apiFile,
      apiFileDownload: apisFile.apiFileDownload,
    }

    const section: SectionModel = {
      id: 'sectionId',
      block: { key: CenterZoneTplComponent, data: { content: { texte: 'aucun texte' }, filename: 'image.png', label: 'Template de base' } },
      values: null
    }

    component.apisConfig = wysiwyg
    component.section = section

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
