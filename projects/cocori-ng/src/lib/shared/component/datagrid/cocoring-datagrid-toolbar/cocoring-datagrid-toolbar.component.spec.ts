import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { ConfigDatagridModel } from '../../../../core/model/component-datagrid.model';
import { DataSourceType } from '../../../../core/model/data-source.model';
import { DatagridService } from '../../../../core/service/datagrid/datagrid.service';
import { CocoringDatagridToolbarComponent } from './cocoring-datagrid-toolbar.component';

describe('CocoringDatagridToolbarComponent', () => {
  let component: CocoringDatagridToolbarComponent;
  let fixture: ComponentFixture<CocoringDatagridToolbarComponent>;

  let datagridService: DatagridService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CocoringDatagridToolbarComponent],
      providers: [{ provide: DatagridService }],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatDialogModule],
    });

    fixture = TestBed.createComponent(CocoringDatagridToolbarComponent);

    component = fixture.componentInstance;

    datagridService = TestBed.inject(DatagridService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the total rows of the datagrid', () => {
    fixture.detectChanges();

    expect(component.totalRows).toEqual(0)

    datagridService.lengthDataSource$.next(500)

    expect(component.totalRows).toEqual(500)
  });

  it('should display the correct pagination', () => {
    let config: ConfigDatagridModel = {
      dataSource: { type: DataSourceType.BRUTE, value: { __count: 500, results: [] } },
      withBatchProcessing: true,
      columns: []
    }

    datagridService.config = config

    datagridService.lengthDataSource$.next(500)

    datagridService.getAllDatas().subscribe()

    fixture.detectChanges();

    let element: DebugElement = fixture.debugElement.query(By.css('.currentPaginationText'));

    expect(element.nativeElement.textContent).toEqual('1 - 10 sur 500');
    expect(datagridService.indicatorPage.from).toEqual(0);
    expect(datagridService.indicatorPage.to).toEqual(10);
    
    ///

    datagridService.lengthDataSource$.next(3)

    datagridService.getAllDatas().subscribe()

    fixture.detectChanges();

    element = fixture.debugElement.query(By.css('.currentPaginationText'));

    expect(element.nativeElement.textContent).toEqual('1 - 3 sur 3');
    expect(datagridService.indicatorPage.from).toEqual(0);
    expect(datagridService.indicatorPage.to).toEqual(3);

    ////////// corriger ça dans datagridService, récup le total rows dans le service

  });

  it('should display the next page', () => {
    let config: ConfigDatagridModel = {
      dataSource: { type: DataSourceType.BRUTE, value: { __count: 0, results: [] } },
      withBatchProcessing: true,
      columns: []
    }

    datagridService.config = config

    datagridService.lengthDataSource$.next(3)

    datagridService.getAllDatas().subscribe()

    fixture.detectChanges();

    let buttonPrevious: DebugElement = fixture.debugElement.query(By.css('.button-previous'));
    let buttonNext: DebugElement = fixture.debugElement.query(By.css('.button-next'));

    expect(buttonNext.nativeElement.disabled).toBeFalsy();
    expect(buttonPrevious.nativeElement.disabled).toBeTruthy();

    // buttonNext.triggerEventHandler('click', null);

    // fixture.detectChanges();

    // expect(buttonNext.nativeElement.disabled).toBeFalsy();
    // expect(buttonPrevious.nativeElement.disabled).toBeFalsy();
    
    // buttonNext.triggerEventHandler('click', null);

    // fixture.detectChanges();

    // expect(buttonNext.nativeElement.disabled).toBeFalsy();
    // expect(buttonPrevious.nativeElement.disabled).toBeFalsy();
  });
});
