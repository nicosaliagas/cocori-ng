import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {
    CocoringVariableHtmlModule,
} from '../../../../feature-core/shared/pipe/variable-html/cocoring-variable-html.module';
import { CocoringConfirmModalComponent } from './cocoring-confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let component: CocoringConfirmModalComponent;
  let fixture: ComponentFixture<CocoringConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringConfirmModalComponent],
      imports: [ReactiveFormsModule, CocoringVariableHtmlModule],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      }, {
        provide: MAT_DIALOG_DATA,
        useValue: {} // Add any data you wish to test if it is passed/used correctly
      }],
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
