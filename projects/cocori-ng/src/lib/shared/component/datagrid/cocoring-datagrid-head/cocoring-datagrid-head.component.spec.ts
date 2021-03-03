import { ComponentFixture, TestBed } from '@angular/core/testing';
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
});
