import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColumnDatagridModel } from 'projects/cocori-ng/src/lib/core/model/component-datagrid.model';
import { DatagridService } from 'projects/cocori-ng/src/lib/core/service/datagrid/datagrid.service';
import { tap } from 'rxjs/operators';

import { CocoringDatagridFilterColumnComponent } from './cocoring-datagrid-filter-column.component';

describe('CocoringDatagridFilterColumnComponent', () => {
  let component: CocoringDatagridFilterColumnComponent;
  let fixture: ComponentFixture<CocoringDatagridFilterColumnComponent>;

  let datasourceServiceSpy: { loadDataSource: jasmine.Spy };
  let formBuilderSpy: { group: jasmine.Spy };
  let datagridService: DatagridService
  let expectedColumn: ColumnDatagridModel

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringDatagridFilterColumnComponent],
      providers: [
        {
          provide: DatagridService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridFilterColumnComponent);
    component = fixture.componentInstance;

    datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', ['loadDataSource']);
    formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);

    datagridService = new DatagridService(datasourceServiceSpy as any, formBuilderSpy as any)

    component.datagridService = datagridService
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name of the column', () => {
    const currentColumn: ColumnDatagridModel = {
      caption: 'Test Caption',
      dataField: 'testdataField',
      visible: true,
      sort: 'NONE',
      dataType: 'string',
    }

    component.column = currentColumn

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement.query(By.css('.column-caption'));

    expect(element.nativeElement.textContent).toEqual('Test Caption');
    expect(element.nativeElement).not.toHaveClass('column-no-visible')
  });

  it('should not display a column', () => {
    const currentColumn: ColumnDatagridModel = {
      caption: 'Test Caption',
      dataField: 'testdataField',
      visible: false,
      sort: 'NONE',
      dataType: 'string',
    }

    component.column = currentColumn

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement.query(By.css('.column-caption'));

    expect(element.nativeElement).toHaveClass('column-no-visible')
  });

  it('should toggle a column visibility', () => {
    const currentColumn: ColumnDatagridModel = {
      caption: 'Test Caption',
      dataField: 'testdataField',
      visible: true,
      sort: 'NONE',
      dataType: 'string',
    }

    component.column = currentColumn

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement.query(By.css('.column-caption'));

    expect(element.nativeElement).not.toHaveClass('column-no-visible')

    let visiblityIcon: DebugElement = fixture.debugElement.query(By.css('button.button-visibility mat-icon'));

    expect(visiblityIcon.nativeElement.textContent).toEqual('visibility');

    const button: DebugElement = fixture.debugElement.query(By.css('.button-visibility'));

    button.triggerEventHandler('click', null);

    expect(component.column.visible).toEqual(false)

    expect(element.nativeElement).toHaveClass('column-no-visible')

    visiblityIcon = fixture.debugElement.query(By.css('button.button-visibility mat-icon'));

    expect(visiblityIcon.nativeElement.textContent).toEqual('visibility_off');

    button.triggerEventHandler('click', null);

    expect(component.column.visible).toEqual(true)

    expect(element.nativeElement).not.toHaveClass('column-no-visible')

    visiblityIcon = fixture.debugElement.query(By.css('button.button-visibility mat-icon'));

    expect(visiblityIcon.nativeElement.textContent).toEqual('visibility');
  });

  it('should sort a column', () => {
    let currentColumn: ColumnDatagridModel = {
      caption: 'Test Caption',
      dataField: 'testdataField',
      visible: true,
      sort: 'NONE',
      dataType: 'string',
    }

    component.column = currentColumn

    datagridService.resetColumnExcept$.pipe(
      tap((datafieldException: string) => {
        expect(datafieldException).toEqual('testdataField')
      }),
    ).subscribe()

    fixture.detectChanges();

    let element: DebugElement = fixture.debugElement.query(By.css('button.action-sort-column mat-icon'));

    expect(element).toBeFalsy()

    let button: DebugElement = fixture.debugElement.query(By.css('.list-item-part-left'));

    button.triggerEventHandler('click', null);

    expect(currentColumn.sort).toEqual('ASC')

    element = fixture.debugElement.query(By.css('button.action-sort-column mat-icon'));

    expect(element).toBeTruthy()

    expect(element.nativeElement.textContent).toEqual('arrow_upward');

    button.triggerEventHandler('click', null);

    expect(currentColumn.sort).toEqual('DESC')

    element = fixture.debugElement.query(By.css('button.action-sort-column mat-icon'));

    expect(element).toBeTruthy()

    expect(element.nativeElement.textContent).toEqual('arrow_downward');

    button.triggerEventHandler('click', null);

    expect(currentColumn.sort).toEqual('NONE')

    element = fixture.debugElement.query(By.css('button.action-sort-column mat-icon'));

    expect(element).toBeFalsy()
  });

  it('should apply sort a multiple columns', () => {
    const eventKeyDown = new KeyboardEvent("keydown", { shiftKey: true });
    const eventKeyUp = new KeyboardEvent("keyup", { code: 'ShiftLeft' });

    window.dispatchEvent(eventKeyDown);

    expect(component.shiftKey).toBeTrue()

    window.dispatchEvent(eventKeyUp);

    expect(component.shiftKey).toBeFalse()
  });
});
