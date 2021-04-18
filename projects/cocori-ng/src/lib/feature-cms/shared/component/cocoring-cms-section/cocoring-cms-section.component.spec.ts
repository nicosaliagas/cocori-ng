import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { CocoringCmsSectionComponent } from './cocoring-cms-section.component';

describe('CocoringCmsSectionComponent', () => {
  let component: CocoringCmsSectionComponent;
  let fixture: ComponentFixture<CocoringCmsSectionComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringCmsSectionComponent ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder }
      ]
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
