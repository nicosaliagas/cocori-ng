import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { ApisConfigCmsModel, SectionModel } from '../../../../core/model/cms.model';
import { CenterZoneTplComponent } from './center-zone-tpl.component';

describe('CenterZoneTplComponent', () => {
  let component: CenterZoneTplComponent;
  let fixture: ComponentFixture<CenterZoneTplComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CenterZoneTplComponent],
      imports: [MatBottomSheetModule],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterZoneTplComponent);
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
      idSection: 'sectionId',
      block: { component: CenterZoneTplComponent, data: { idBlock: 'blockid', content: { texte: 'aucun texte' }, filename: 'image.png', label: 'Template de base' } },
      values: null
    }

    component.section = section
    component.apisConfig = wysiwyg

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
