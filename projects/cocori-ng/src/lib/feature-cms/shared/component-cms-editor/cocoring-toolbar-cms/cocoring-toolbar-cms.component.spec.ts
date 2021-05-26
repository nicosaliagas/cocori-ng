import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringToolbarCmsComponent } from './cocoring-toolbar-cms.component';

describe('CocoringToolbarCmsComponent', () => {
  let component: CocoringToolbarCmsComponent;
  let fixture: ComponentFixture<CocoringToolbarCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringToolbarCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringToolbarCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
