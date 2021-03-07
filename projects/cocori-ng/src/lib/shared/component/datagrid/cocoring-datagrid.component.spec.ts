import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ConfigDatagridModel } from '../../../core/model/component-datagrid.model';
import { DataSourceType } from '../../../core/model/data-source.model';
import { DatagridService } from '../../../core/service/datagrid/datagrid.service';
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
        FormBuilder
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
      columns: [{ dataField: 'testDatafield', caption: 'Test Caption', visible: true }, { dataField: 'testDatafield2', caption: 'Test Caption 2', visible: true }],
      title: 'Datagrid Title'
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
