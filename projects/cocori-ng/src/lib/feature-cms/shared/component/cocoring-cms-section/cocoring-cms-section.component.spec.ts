import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringCmsSectionComponent } from './cocoring-cms-section.component';

describe('CocoringCmsSectionComponent', () => {
  let component: CocoringCmsSectionComponent;
  let fixture: ComponentFixture<CocoringCmsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringCmsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringCmsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
