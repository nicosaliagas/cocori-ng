import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CellValueDatagridModel } from '../../../../core/model/component-datagrid.model';
import { CocoringDatagridCellComponent } from './cocoring-datagrid-cell.component';

describe('CocoringDatagridCellComponent', () => {
  let component: CocoringDatagridCellComponent;
  let fixture: ComponentFixture<CocoringDatagridCellComponent>;
  let expectedCell: CellValueDatagridModel

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringDatagridCellComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridCellComponent);
    component = fixture.componentInstance;

    expectedCell = <CellValueDatagridModel>{ caption: 'Test Datafield', value: 'Test Value', visible: true };

    component.cell = expectedCell;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cell value and title correctly ', () => {
    const TdDe: DebugElement = fixture.debugElement.query(By.css('td'));

    expect(TdDe.nativeElement.textContent).toEqual(expectedCell.value);
    expect(TdDe.nativeElement.getAttribute('title')).toEqual(expectedCell.value);
  });

  it('should display cell attribute correctly ', () => {
    const TdDe: DebugElement = fixture.debugElement.query(By.css('td'));

    expect(TdDe.nativeElement.getAttribute('data-label')).toEqual(expectedCell.caption);
  });
});
