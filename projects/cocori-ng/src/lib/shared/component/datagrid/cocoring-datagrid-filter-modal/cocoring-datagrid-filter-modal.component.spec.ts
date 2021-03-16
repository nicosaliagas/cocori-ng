import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { ColumnDatagridModel, ConfigDatagridModel } from '../../../../core/model/component-datagrid.model';
import { DatagridService } from '../../../../core/service/datagrid/datagrid.service';
import { CocoringDatagridFilterModalComponent } from './cocoring-datagrid-filter-modal.component';

describe('CocoringDatagridFilterModalComponent', () => {
  let component: CocoringDatagridFilterModalComponent;
  let fixture: ComponentFixture<CocoringDatagridFilterModalComponent>;

  let httpClientSpy: { get: jasmine.Spy };
  let formBuilderSpy: { group: jasmine.Spy };
  let datagridService: DatagridService
  let config: ConfigDatagridModel = {
    withBatchProcessing: true,
    columns: [
      { dataField: 'testDatafield', dataType: 'string', caption: 'Test Caption', visible: true },
      { dataField: 'testDatafield2', dataType: 'string', caption: 'Test Caption 2', visible: true }]
  }

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);

    datagridService = new DatagridService(httpClientSpy as any, formBuilderSpy as any)

    datagridService.config = config

    await TestBed.configureTestingModule({
      declarations: [CocoringDatagridFilterModalComponent],
      imports: [MatDialogModule, ReactiveFormsModule],
      providers: [
        {
          provide: DatagridService
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { 'datagridService': datagridService }
        },
        {
          provide: MatDialogRef,
          useValue: { close: (dialogResult: any) => { } }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridFilterModalComponent);
    component = fixture.componentInstance;

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);

    datagridService = new DatagridService(httpClientSpy as any, formBuilderSpy as any)

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display name a selected column in the header of the modal', () => {
    const currentColumn: ColumnDatagridModel = {
      caption: 'Test Caption',
      dataField: 'testdataField',
      visible: true,
      dataType: 'string',
    }

    component.currentColumn = currentColumn

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement.query(By.css('h1.header-title'));

    expect(element.nativeElement.textContent).toEqual('Test Caption');
  });

  it('should display a cross icon in the header by default', () => {
    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement.query(By.css('button.actions-header-modal mat-icon'));

    expect(element.nativeElement.textContent).toEqual('clear');
  });

  it('should display a left arrow icon in the header when a column is selected', () => {
    const currentColumn: ColumnDatagridModel = {
      caption: 'Test Caption',
      dataField: 'testdataField',
      visible: true,
      dataType: 'string',
    }

    component.currentColumn = currentColumn

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement.query(By.css('button.actions-header-modal mat-icon'));

    expect(element.nativeElement.textContent).toEqual('keyboard_arrow_left');
  });

  it('should unselect the column correctly', () => {
    const currentColumn: ColumnDatagridModel = {
      caption: 'Test Caption',
      dataField: 'testdataField',
      visible: true,
      dataType: 'string',
    }

    component.currentColumn = currentColumn

    fixture.detectChanges();

    let element: DebugElement = fixture.debugElement.query(By.css('button.actions-header-modal mat-icon'));

    expect(element.nativeElement.textContent).toEqual('keyboard_arrow_left');

    const button: DebugElement = fixture.debugElement.query(By.css('button.actions-header-modal'));

    button.triggerEventHandler('click', null);

    expect(component.currentColumn).toBeNull()

    // devrait affichier clear
    // expect(element.nativeElement.textContent).toEqual('clear');
  });

  it('should have the correct number of columns from the list', () => {
    fixture.detectChanges();

    const columns: DebugElement[] = fixture.debugElement.queryAll(By.css('cocoring-datagrid-filter-column'));

    expect(columns.length).toEqual(2);
  })
});
