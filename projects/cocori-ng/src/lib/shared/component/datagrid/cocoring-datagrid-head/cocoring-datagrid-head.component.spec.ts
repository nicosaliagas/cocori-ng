import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoringDatagridCellComponent } from './cocoring-datagrid-cell.component';

describe('CocoringDatagridCellComponent', () => {
  let component: CocoringDatagridCellComponent;
  let fixture: ComponentFixture<CocoringDatagridCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocoringDatagridCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
