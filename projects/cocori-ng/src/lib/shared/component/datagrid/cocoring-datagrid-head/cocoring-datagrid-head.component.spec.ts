import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColumnDatagridModel } from '../../../../core/model/component-datagrid.model';
import { DatagridService } from '../../../../core/service/datagrid/datagrid.service';
import { CocoringDatagridHeadComponent } from './cocoring-datagrid-head.component';

// const DatagridServiceStub = {
//   get resetColumnExcept$(): Subject<string> {
//     return new Subject<string>();
//   }
// };

describe('CocoringDatagridHeadComponent', () => {
  let component: CocoringDatagridHeadComponent;
  let fixture: ComponentFixture<CocoringDatagridHeadComponent>;
  let expectedColumn: ColumnDatagridModel

  let httpClientSpy: { get: jasmine.Spy };
  let formBuilderSpy: { group: jasmine.Spy };
  let datagridService: DatagridService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringDatagridHeadComponent],
      providers: [
        {
          // provide: DatagridService, useValue: DatagridServiceStub
          provide: DatagridService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridHeadComponent);
    component = fixture.componentInstance;

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);

    // datagridService = TestBed.inject(DatagridService);

    datagridService = new DatagridService(httpClientSpy as any, formBuilderSpy as any)

    expectedColumn = <ColumnDatagridModel>{ dataField: 'mockDatafield', caption: 'Test Caption', sort: 'NONE' };

    component.column = expectedColumn
    component.datagridService = datagridService

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct caption in the view', () => {
    const ThDe: DebugElement = fixture.debugElement.query(By.css('th'));
    const CaptionDe: DebugElement = fixture.debugElement.query(By.css('.column-caption'));

    expect(ThDe.nativeElement.getAttribute('title')).toEqual(expectedColumn.caption);
    expect(CaptionDe.nativeElement.textContent).toEqual(expectedColumn.caption);
  });

  it('should sort the column correctly', () => {
    expect(component.column.sort).toEqual('NONE');

    const ThDe: DebugElement = fixture.debugElement.query(By.css('th'));

    ThDe.triggerEventHandler('click', null);

    expect(component.column.sort).toEqual('ASC');

    ThDe.triggerEventHandler('click', null);

    expect(component.column.sort).toEqual('DESC');

    ThDe.triggerEventHandler('click', null);

    expect(component.column.sort).toEqual('NONE');
  });

  it('if reset sort status of all columns, it should not reset the status of this column', () => {
    expect(component.column.sort).toEqual('NONE');

    const ThDe: DebugElement = fixture.debugElement.query(By.css('th'));

    ThDe.triggerEventHandler('click', null);

    expect(component.column.sort).toEqual('ASC');

    datagridService.resetColumnExcept$.next('mockDatafield')

    expect(component.column.sort).toEqual('ASC');

    ThDe.triggerEventHandler('click', null); // DESC

    ThDe.triggerEventHandler('click', null); // NONE

    ThDe.triggerEventHandler('click', null); // ASC

    expect(component.column.sort).toEqual('ASC');

    datagridService.resetColumnExcept$.next('coloneQuiNExistePas')

    expect(component.column.sort).toEqual('NONE');
  });
});
