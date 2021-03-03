import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { ColumnDatagridModel } from '../../../../core/model/component-datagrid.model';
import { DatagridService } from '../../../../core/service/datagrid/datagrid.service';
import { CocoringDatagridCellComponent } from '../cocoring-datagrid-cell/cocoring-datagrid-cell.component';
import { CocoringDatagridRowComponent } from './cocoring-datagrid-row.component';

const DatagridServiceStub = {
  get allRowsChecked$(): Subject<boolean> {
    return new Subject<boolean>();
  }
};

describe('CocoringDatagridRowComponent', () => {
  let component: CocoringDatagridRowComponent;
  let fixture: ComponentFixture<CocoringDatagridRowComponent>;
  let expectedColums: ColumnDatagridModel[]
  let expectedDatas: object

  let httpClientSpy: { get: jasmine.Spy };
  let formBuilderSpy: { group: jasmine.Spy };
  let formBuilder: FormBuilder;
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

    expectedColums = [{ dataField: 'testDatafield', caption: 'Test Caption' }, { dataField: 'testDatafield2', caption: 'Test Caption 2' }];
    expectedDatas = { id: 'Test Id', testDatafield: 'Value Datafield', testDatafield2: 'Value testDatafield2' };

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
  });

  it('should have one td column-select in the row', () => {
    const TdDe: DebugElement[] = fixture.debugElement.queryAll(By.css('td.column-select'));

    expect(TdDe.length).toEqual(1)
  });
});
