import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringConfirmModalComponent } from './cocoring-confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let component: CocoringConfirmModalComponent;
  let fixture: ComponentFixture<CocoringConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringConfirmModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
