import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringCmsReadonlyComponent } from './cocoring-cms-readonly.component';

describe('CocoringLoaderComponent', () => {
  let component: CocoringCmsReadonlyComponent;
  let fixture: ComponentFixture<CocoringCmsReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringCmsReadonlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringCmsReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
