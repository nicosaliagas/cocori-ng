import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { ColumnDatagridModel } from '../../../../core/model/component-datagrid.model';
import { DatagridService } from '../../../../core/service/datagrid/datagrid.service';
import { CocoringDatagridHeadComponent } from './cocoring-datagrid-head.component';

const DatagridServiceStub = {
  get resetColumnExcept$(): Subject<string> {
    return new Subject<string>();
  }
};

describe('CocoringDatagridHeadComponent', () => {
  let component: CocoringDatagridHeadComponent;
  let fixture: ComponentFixture<CocoringDatagridHeadComponent>;
  let datagridService: DatagridService
  let expectedColumn: ColumnDatagridModel

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringDatagridHeadComponent],
      providers: [
        {
          provide: DatagridService, useValue: DatagridServiceStub
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridHeadComponent);
    component = fixture.componentInstance;

    datagridService = TestBed.inject(DatagridService);

    expectedColumn = <ColumnDatagridModel>{ caption: 'Test Caption', sort: 'NONE' };

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

    expect(component.column.sort).toEqual('ASC');

    /** TODO : implémenter resetColumnExcept$ et refreshNeeded$ dans le service... */
  });
});
