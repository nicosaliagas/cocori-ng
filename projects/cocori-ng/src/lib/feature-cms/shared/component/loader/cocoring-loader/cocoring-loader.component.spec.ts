import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringLoaderComponent } from './cocoring-loader.component';

describe('CocoringLoaderComponent', () => {
  let component: CocoringLoaderComponent;
  let fixture: ComponentFixture<CocoringLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
