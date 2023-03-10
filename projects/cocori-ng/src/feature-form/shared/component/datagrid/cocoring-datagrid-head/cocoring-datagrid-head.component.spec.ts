import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColumnDatagridModel } from '../../../../feature-core/core/model/component-datagrid.model';
import { DatagridService } from '../../../../feature-core/core/service/datagrid/datagrid.service';
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

    datagridService = new DatagridService(httpClientSpy as any, formBuilderSpy as any)

    expectedColumn = <ColumnDatagridModel>{ dataField: 'mockDatafield', caption: 'Test Caption', visible: true, sort: 'NONE' };

    component.column = expectedColumn
    component.datagridService = datagridService
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct caption in the view', () => {
    fixture.detectChanges();

    const ThDe: DebugElement = fixture.debugElement.query(By.css('th'));
    const CaptionDe: DebugElement = fixture.debugElement.query(By.css('.column-caption'));

    expect(ThDe.nativeElement.getAttribute('title')).toEqual(expectedColumn.caption);
    expect(CaptionDe.nativeElement.textContent).toEqual(expectedColumn.caption);
  });

  it('should not display the column', () => {
    expectedColumn.visible = false

    fixture.detectChanges();

    const ThDe: DebugElement = fixture.debugElement.query(By.css('th'));

    expect(ThDe).toBeFalsy()
  });

  it('should sort the column correctly', () => {
    fixture.detectChanges();

    expect(component.column.sort).toEqual('NONE');

    const ThDe: DebugElement = fixture.debugElement.query(By.css('th'));

    ThDe.triggerEventHandler('click', null);

    expect(component.column.sort).toEqual('ASC');

    ThDe.triggerEventHandler('click', null);

    expect(component.column.sort).toEqual('DESC');

    ThDe.triggerEventHandler('click', null);

    expect(component.column.sort).toEqual('NONE');
  });

  it('should refresh the datagrid by emit an event from subject when a column is sorted', () => {
    fixture.detectChanges();

    spyOn(datagridService.refreshNeeded$, 'next')

    const ThDe: DebugElement = fixture.debugElement.query(By.css('th'));

    ThDe.triggerEventHandler('click', null);

    ThDe.triggerEventHandler('click', null);

    ThDe.triggerEventHandler('click', null);

    expect(datagridService.refreshNeeded$.next).toHaveBeenCalledTimes(3)
  })

  it('if reset sort status of all columns, it should not reset the status of this column', () => {
    fixture.detectChanges();

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
