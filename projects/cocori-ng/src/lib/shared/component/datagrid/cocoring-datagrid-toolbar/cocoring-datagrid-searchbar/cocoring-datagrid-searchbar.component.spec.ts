import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { CocoringDatagridSearchbarComponent } from './cocoring-datagrid-searchbar.component';

describe('CocoringDatagridSearchbarComponent', () => {
  let component: CocoringDatagridSearchbarComponent;
  let fixture: ComponentFixture<CocoringDatagridSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringDatagridSearchbarComponent],
      providers: [
        FormBuilder
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
