import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import {
    CellValueDatagridModel,
    ColumnDatagridModel,
    ConfigDatagridModel,
} from '../../../../feature-core/core/model/component-datagrid.model';
import { DatagridService } from '../../../../feature-core/core/service/datagrid/datagrid.service';
import { CocoringDatagridCellComponent } from '../cocoring-datagrid-cell/cocoring-datagrid-cell.component';
import { CocoringDatagridRowComponent } from './cocoring-datagrid-row.component';

// const DatagridServiceStub = {
//   get allRowsChecked$(): Subject<boolean> {
//     return new Subject<boolean>();
//   }
// };

describe('CocoringDatagridRowComponent', () => {
  let component: CocoringDatagridRowComponent;
  let fixture: ComponentFixture<CocoringDatagridRowComponent>;
  let expectedColums: ColumnDatagridModel[]
  let expectedDatas: object

  let formBuilder: FormBuilder;
  let httpClientSpy: { get: jasmine.Spy };
  let formBuilderSpy: { group: jasmine.Spy };
  let datagridService: DatagridService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringDatagridRowComponent, CocoringDatagridCellComponent],
      providers: [
        {
          provide: DatagridService
        },
        FormBuilder
      ],
      imports: [ReactiveFormsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridRowComponent);
    component = fixture.componentInstance;

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);

    formBuilder = TestBed.inject(FormBuilder);

    datagridService = new DatagridService(httpClientSpy as any, formBuilderSpy as any)

    let config: ConfigDatagridModel = {
      dataSource: null,
      withBatchProcessing: true,
      columns: []
    }

    datagridService.config = config
    datagridService.checkboxesDatagridForm = formBuilder.group({
      selectAllRowsCheckbox: new FormControl(false),
      rowsCheckbox: new FormArray([]),
    });

    expectedColums = [
      { dataField: 'testDatafield', dataType: 'string', caption: 'Test Caption', visible: true },
      { dataField: 'testDatafield2', dataType: 'string', caption: 'Test Caption 2', visible: true }];

    expectedDatas = { id: 'TestId', testDatafield: 'Value Datafield', testDatafield2: 'Value testDatafield2' };

    component.datagridService = datagridService;
    component.columns = expectedColums;
    component.datas = expectedDatas;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct number of td in the row', () => {
    fixture.detectChanges();

    const TdDe: DebugElement[] = fixture.debugElement.queryAll(By.css('td'));

    expect(TdDe.length).toEqual(expectedColums.length + 1);

    expect(component.cellValues.length).toEqual(expectedColums.length);
  });

  it('should have one td column-select in the row', () => {
    fixture.detectChanges();

    const TdDe: DebugElement[] = fixture.debugElement.queryAll(By.css('td.column-select'));

    expect(TdDe.length).toEqual(1)
  });

  it('should not display the checkbox if not batch processing', () => {
    datagridService.config.withBatchProcessing = false

    fixture.detectChanges();

    const TdDe: DebugElement = fixture.debugElement.query(By.css('td.column-select'));

    expect(TdDe).toBeFalsy()
  });

  it('should have the correct values in cell array', () => {
    fixture.detectChanges();

    expect(component.cellValues.length).toEqual(expectedColums.length);

    let cellValue: CellValueDatagridModel = component.cellValues[0]

    expect(cellValue).toEqual(<CellValueDatagridModel>{ dataField: 'testDatafield', dataType: 'string', value: 'Value Datafield', visible: true, caption: 'Test Caption' });

    cellValue = component.cellValues[1]

    expect(cellValue).toEqual(<CellValueDatagridModel>{ dataField: 'testDatafield2', dataType: 'string', value: 'Value testDatafield2', visible: true, caption: 'Test Caption 2' });
  });

  it('reorder the columns, it should reorder the cells array', () => {
    fixture.detectChanges();

    expect(component.cellValues.length).toEqual(expectedColums.length);

    datagridService.reOrderColumns$.next({ currentIndex: 1, previousIndex: 0 })

    let cellValue: CellValueDatagridModel = component.cellValues[0]

    expect(cellValue).toEqual(<CellValueDatagridModel>{ dataField: 'testDatafield2', dataType: 'string', value: 'Value testDatafield2', visible: true, caption: 'Test Caption 2' });

    cellValue = component.cellValues[1]

    expect(cellValue).toEqual(<CellValueDatagridModel>{ dataField: 'testDatafield', dataType: 'string', value: 'Value Datafield', visible: true, caption: 'Test Caption' });
  });

  it('should have a checkbox control in the form array rowsCheckbox with the value false', () => {
    fixture.detectChanges();

    const checkboxesFormControlArray: FormArray = <FormArray>datagridService.checkboxesDatagridForm.get("rowsCheckbox");

    expect(checkboxesFormControlArray.length).toEqual(1);

    expect(component.checkboxRowFormGroup.get('TestId').value).toBeFalse()
  });

  it('should check the row if the all checkbox of the array is checked', () => {
    fixture.detectChanges();

    datagridService.allRowsChecked$.next(true)

    expect(component.checkboxRowFormGroup.get('TestId').value).toBeTrue()
  });
});
