import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringLoaderSectionComponent } from './cocoring-loader-section.component';

describe('CocoringLoaderSectionComponent', () => {
  let component: CocoringLoaderSectionComponent;
  let fixture: ComponentFixture<CocoringLoaderSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringLoaderSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringLoaderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
