import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringPreviewOptionsComponent } from './cocoring-preview-options.component';

describe('CocoringPreviewOptionsComponent', () => {
  let component: CocoringPreviewOptionsComponent;
  let fixture: ComponentFixture<CocoringPreviewOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringPreviewOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringPreviewOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
