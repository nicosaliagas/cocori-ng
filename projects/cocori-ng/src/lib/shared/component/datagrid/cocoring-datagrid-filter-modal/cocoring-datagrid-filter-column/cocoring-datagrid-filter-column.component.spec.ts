import { ComponentFixture, TestBed } from '@angular/core/testing';
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

    // datagridService = TestBed.inject(DatagridService);

    datagridService = new DatagridService(httpClientSpy as any, formBuilderSpy as any)
    expectedColumn = <ColumnDatagridModel>{ dataField: 'mockDatafield', caption: 'Test Caption', visible: true, sort: 'NONE' };

    component.column = expectedColumn
    component.datagridService = datagridService

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
