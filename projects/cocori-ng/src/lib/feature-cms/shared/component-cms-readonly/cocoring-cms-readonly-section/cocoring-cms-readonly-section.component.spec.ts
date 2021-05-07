import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringCmsReadonlySectionComponent } from './cocoring-cms-readonly-section.component';

describe('CocoringLoaderSectionComponent', () => {
  let component: CocoringCmsReadonlySectionComponent;
  let fixture: ComponentFixture<CocoringCmsReadonlySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringCmsReadonlySectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringCmsReadonlySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
