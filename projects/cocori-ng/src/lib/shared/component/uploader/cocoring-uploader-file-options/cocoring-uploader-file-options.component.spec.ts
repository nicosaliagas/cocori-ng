import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringUploaderFileOptionsComponent } from './cocoring-uploader-file-options.component';

describe('CocoringUploaderFileOptionsComponent', () => {
  let component: CocoringUploaderFileOptionsComponent;
  let fixture: ComponentFixture<CocoringUploaderFileOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringUploaderFileOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringUploaderFileOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
