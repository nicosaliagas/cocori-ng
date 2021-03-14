import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColumnDatagridModel } from 'projects/cocori-ng/src/lib/core/model/component-datagrid.model';
import { DatagridService } from 'projects/cocori-ng/src/lib/core/service/datagrid/datagrid.service';

import { CocoringDatagridFilterColumnComponent } from './cocoring-datagrid-filter-column.component';

describe('CocoringDatagridFilterColumnComponent', () => {
  let component: CocoringDatagridFilterColumnComponent;
  let fixture: ComponentFixture<CocoringDatagridFilterColumnComponent>;

  let httpClientSpy: { get: jasmine.Spy };
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

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);

    datagridService = new DatagridService(httpClientSpy as any, formBuilderSpy as any)

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

  it('should check if the column is marked as not visible', () => {
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

    const button: DebugElement = fixture.debugElement.query(By.css('.button-visibility'));

    button.triggerEventHandler('click', null);

    expect(component.column.visible).toEqual(false)

    expect(element.nativeElement).toHaveClass('column-no-visible')

    button.triggerEventHandler('click', null);

    expect(component.column.visible).toEqual(true)

    expect(element.nativeElement).not.toHaveClass('column-no-visible')
  });
});
