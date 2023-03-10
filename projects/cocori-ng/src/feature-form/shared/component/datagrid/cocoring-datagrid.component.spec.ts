import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ConfigDatagridModel } from '../../../feature-core/core/model/component-datagrid.model';
import { DataSourceType } from '../../../feature-core/core/model/data-source.model';
import { DatagridService } from '../../../feature-core/core/service/datagrid/datagrid.service';
import { CocoringDatagridComponent } from './cocoring-datagrid.component';

describe('CocoringDatagridComponent', () => {
  let component: CocoringDatagridComponent;
  let fixture: ComponentFixture<CocoringDatagridComponent>;
  let datagridService: DatagridService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringDatagridComponent],
      providers: [
        {
          provide: DatagridService
        },
        UntypedFormBuilder
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridComponent);
    component = fixture.componentInstance;

    datagridService = TestBed.inject(DatagridService);

    datagridService.initCheckboxesDatagridForm()

    let config: ConfigDatagridModel = {
      dataSource: { type: DataSourceType.BRUTE, value: { __count: 0, results: [] } },
      withBatchProcessing: true,
      columns: [
        { dataField: 'testDatafield', dataType:'string', caption: 'Test Caption', visible: true }, 
        { dataField: 'testDatafield2', dataType:'string', caption: 'Test Caption 2', visible: true }]
    }

    component.config = config

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when refresh datagrid should uncheck all rows', fakeAsync(inject([DatagridService], (datagridService: DatagridService) => {
    let checkboxAllRows: boolean = datagridService.checkboxesDatagridForm.get("selectAllRowsCheckbox").value

    expect(checkboxAllRows).toBeFalse()

    datagridService.checkboxesDatagridForm.get("selectAllRowsCheckbox").setValue(true)

    datagridService.refreshNeeded$.next()

    tick(700);

    checkboxAllRows = datagridService.checkboxesDatagridForm.get("selectAllRowsCheckbox").value

    expect(checkboxAllRows).toBeFalse()

    discardPeriodicTasks()
  })))

  it('should have the correct number of columns', () => {
    const ThDe: DebugElement[] = fixture.debugElement.queryAll(By.css('th'));
    const DatagridHeadDe: DebugElement[] = fixture.debugElement.queryAll(By.css('cocoring-datagrid-head'));

    expect(ThDe.length).toEqual(1);
    expect(DatagridHeadDe.length).toEqual(2);
  });
});
