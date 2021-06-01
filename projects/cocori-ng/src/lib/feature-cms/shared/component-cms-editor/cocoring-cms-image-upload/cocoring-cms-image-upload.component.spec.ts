import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringCmsImageUploadComponent } from './cocoring-cms-image-upload.component';

describe('CocoringCmsImageUploadComponent', () => {
  let component: CocoringCmsImageUploadComponent;
  let fixture: ComponentFixture<CocoringCmsImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringCmsImageUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringCmsImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
