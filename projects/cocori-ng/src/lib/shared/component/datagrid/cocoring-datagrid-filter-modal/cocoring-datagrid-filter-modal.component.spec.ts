import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { ConfigDatagridModel } from '../../../../core/model/component-datagrid.model';
import { DatagridService } from '../../../../core/service/datagrid/datagrid.service';
import { CocoringDatagridFilterModalComponent } from './cocoring-datagrid-filter-modal.component';

describe('CocoringDatagridFilterModalComponent', () => {
  let component: CocoringDatagridFilterModalComponent;
  let fixture: ComponentFixture<CocoringDatagridFilterModalComponent>;

  let httpClientSpy: { get: jasmine.Spy };
  let formBuilderSpy: { group: jasmine.Spy };
  let datagridService: DatagridService
  let config: ConfigDatagridModel = {
    columns: [{ dataField: 'testDatafield', caption: 'Test Caption', visible: true }, { dataField: 'testDatafield2', caption: 'Test Caption 2', visible: true }],
    title: 'Datagrid Title'
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
