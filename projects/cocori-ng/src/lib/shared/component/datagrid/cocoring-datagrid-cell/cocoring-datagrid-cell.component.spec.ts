import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CellValueDatagridModel } from '../../../../feature-core/core/model/component-datagrid.model';
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cell string value correctly ', () => {
    expectedCell = <CellValueDatagridModel>{ dataType: 'string', caption: 'Test Datafield', value: 'Test Value', visible: true };

    component.cell = expectedCell;

    fixture.detectChanges();

    const TdDe: DebugElement = fixture.debugElement.query(By.css('td'));

    expect(TdDe.nativeElement.textContent).toEqual('Test Value');
    expect(TdDe.nativeElement.getAttribute('title')).toEqual('Test Value');
    expect(TdDe.nativeElement.getAttribute('data-label')).toEqual('Test Datafield');
  });

  it('should display cell date value correctly ', () => {
    const presentDate: Date = new Date('03/11/2021');

    expectedCell = <CellValueDatagridModel>{ dataType: 'date', caption: 'Test Datafield', value: presentDate, visible: true };

    component.cell = expectedCell;

    fixture.detectChanges();

    const TdDe: DebugElement = fixture.debugElement.query(By.css('td'));

    expect(TdDe.nativeElement.textContent).toEqual('11/03/2021');
    expect(TdDe.nativeElement.getAttribute('title')).toEqual('11/03/2021');
    expect(TdDe.nativeElement.getAttribute('data-label')).toEqual('Test Datafield');
  });

  it('should not display cell', () => {
    expectedCell = <CellValueDatagridModel>{ dataType: 'string', caption: 'Test Datafield', value: 'test', visible: false };

    component.cell = expectedCell;

    fixture.detectChanges();

    const TdDe: DebugElement = fixture.debugElement.query(By.css('td'));

    expect(TdDe).toBeFalsy()
  });

  it('change a cell value and should report the change in the UI', () => {
    expectedCell = <CellValueDatagridModel>{ dataType: 'string', caption: 'Test Datafield', value: 'Test Value', visible: true };

    component.cell = expectedCell;

    fixture.detectChanges();

    const TdDe: DebugElement = fixture.debugElement.query(By.css('td'));

    expect(TdDe.nativeElement.textContent).toEqual('Test Value');

    expectedCell.value = 'Value Changed'

    component.cell = expectedCell;

    fixture.detectChanges();

    expect(TdDe.nativeElement.textContent).toEqual('Value Changed');
  });
});
