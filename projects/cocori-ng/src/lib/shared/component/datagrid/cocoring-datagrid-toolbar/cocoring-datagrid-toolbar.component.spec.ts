import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { CocoringDatagridToolbarComponent } from './cocoring-datagrid-toolbar.component';

describe('CocoringDatagridToolbarComponent', () => {
  let component: CocoringDatagridToolbarComponent;
  let fixture: ComponentFixture<CocoringDatagridToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringDatagridToolbarComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatDialogModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
