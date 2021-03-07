import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CellValueDatagridModel, ColumnDatagridModel } from '../../../../core/model/component-datagrid.model';
import { DatagridService } from '../../../../core/service/datagrid/datagrid.service';
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

    // datagridService = TestBed.inject(DatagridService);

    datagridService = new DatagridService(httpClientSpy as any, formBuilderSpy as any)

    formBuilder = TestBed.inject(FormBuilder);

    datagridService.checkboxesDatagridForm = formBuilder.group({
      selectAllRowsCheckbox: new FormControl(false),
      rowsCheckbox: new FormArray([]),
    });

    expectedColums = [{ dataField: 'testDatafield', caption: 'Test Caption', visible: true }, { dataField: 'testDatafield2', caption: 'Test Caption 2', visible: true }];
    expectedDatas = { id: 'TestId', testDatafield: 'Value Datafield', testDatafield2: 'Value testDatafield2' };

    component.datagridService = datagridService;
    component.columns = expectedColums;
    component.datas = expectedDatas;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct number of td in the row', () => {
    const TdDe: DebugElement[] = fixture.debugElement.queryAll(By.css('td'));

    expect(TdDe.length).toEqual(expectedColums.length + 1);

    expect(component.cellValues.length).toEqual(expectedColums.length);
  });

  it('should have one td column-select in the row', () => {
    const TdDe: DebugElement[] = fixture.debugElement.queryAll(By.css('td.column-select'));

    expect(TdDe.length).toEqual(1)
  });

  it('should have the correct values in cell array', () => {
    expect(component.cellValues.length).toEqual(expectedColums.length);

    let cellValue: CellValueDatagridModel = component.cellValues[0]

    expect(cellValue).toEqual(<CellValueDatagridModel>{ dataField: 'testDatafield', value: 'Value Datafield', visible: true });

    cellValue = component.cellValues[1]

    expect(cellValue).toEqual(<CellValueDatagridModel>{ dataField: 'testDatafield2', value: 'Value testDatafield2', visible: true });
  });

  it('should have a checkbox control in the form array rowsCheckbox with the value false', () => {
    const checkboxesFormControlArray: FormArray = <FormArray>datagridService.checkboxesDatagridForm.get("rowsCheckbox");

    expect(checkboxesFormControlArray.length).toEqual(1);

    expect(component.checkboxRowFormGroup.get('TestId').value).toBeFalse()
  });

  it('should check the row if the all checkbox of the array is checked', () => {
    datagridService.allRowsChecked$.next(true)

    expect(component.checkboxRowFormGroup.get('TestId').value).toBeTrue()
  });
});
