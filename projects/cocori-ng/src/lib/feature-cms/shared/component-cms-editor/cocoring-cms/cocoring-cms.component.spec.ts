import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { CocoringCmsComponent } from './cocoring-cms.component';

describe('CocoringCmsComponent', () => {
  let component: CocoringCmsComponent;
  let fixture: ComponentFixture<CocoringCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringCmsComponent ],
      imports: [MatButtonToggleModule, ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
