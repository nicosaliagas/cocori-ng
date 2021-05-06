import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringLoaderSectionTemplatesComponent } from './cocoring-loader-section-templates.component';

describe('CocoringLoaderSectionTemplatesComponent', () => {
  let component: CocoringLoaderSectionTemplatesComponent;
  let fixture: ComponentFixture<CocoringLoaderSectionTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringLoaderSectionTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringLoaderSectionTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
