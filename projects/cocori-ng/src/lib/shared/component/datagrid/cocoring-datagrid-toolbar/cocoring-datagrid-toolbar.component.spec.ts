import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
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

    // datagridService.lengthDataSource$.next(500)
    datagridService.lengthDataSource(500)

    expect(component.totalRows).toEqual(500)
  });

  it('should display the correct pagination if the total rows is superior than the number of items per page', () => {
    let config: ConfigDatagridModel = {
      dataSource: { type: DataSourceType.BRUTE, value: { __count: 500, results: [] } },
      withBatchProcessing: true,
      columns: []
    }

    datagridService.config = config

    datagridService.lengthDataSource(500)

    datagridService.getAllDatas().subscribe()

    fixture.detectChanges();

    let element: DebugElement = fixture.debugElement.query(By.css('.currentPaginationText'));

    expect(element.nativeElement.textContent).toEqual('1 - 10 sur 500');
    expect(datagridService.indicatorPage.from).toEqual(0);
    expect(datagridService.indicatorPage.to).toEqual(10);
  });
  
  it('should display the correct pagination if the total rows is less than the number of items per page', () => {
    let config: ConfigDatagridModel = {
      dataSource: { type: DataSourceType.BRUTE, value: { __count: 3, results: [] } },
      withBatchProcessing: true,
      columns: []
    }

    datagridService.config = config

    datagridService.lengthDataSource(3)

    datagridService.getAllDatas().subscribe()

    fixture.detectChanges();

    let element: DebugElement = fixture.debugElement.query(By.css('.currentPaginationText'));

    expect(element.nativeElement.textContent).toEqual('1 - 3 sur 3');
    expect(datagridService.indicatorPage.from).toEqual(0);
    expect(datagridService.indicatorPage.to).toEqual(3);
  });

  it('should disable pagination buttons', () => {
    let config: ConfigDatagridModel = {
      dataSource: { type: DataSourceType.BRUTE, value: { __count: 0, results: [] } },
      withBatchProcessing: true,
      columns: []
    }

    datagridService.config = config

    datagridService.lengthDataSource(3)

    datagridService.getAllDatas().subscribe()

    fixture.detectChanges();

    let buttonPrevious: DebugElement = fixture.debugElement.query(By.css('.button-previous'));
    let buttonNext: DebugElement = fixture.debugElement.query(By.css('.button-next'));

    expect(buttonNext.nativeElement.disabled).toBeTruthy();
    expect(buttonPrevious.nativeElement.disabled).toBeTruthy();
  });
  
  it('should enable pagination buttons', fakeAsync(() => {
    let config: ConfigDatagridModel = {
      dataSource: { type: DataSourceType.BRUTE, value: { __count: 0, results: [] } },
      withBatchProcessing: true,
      columns: []
    }

    datagridService.config = config

    datagridService.lengthDataSource(30)

    datagridService.getAllDatas().subscribe()

    fixture.detectChanges();

    let buttonPrevious: DebugElement = fixture.debugElement.query(By.css('.button-previous'));
    let buttonNext: DebugElement = fixture.debugElement.query(By.css('.button-next'));

    expect(buttonNext.nativeElement.disabled).toBeFalsy();
    expect(buttonPrevious.nativeElement.disabled).toBeTruthy();

    expect(datagridService.indicatorPage.from).toEqual(0);
    expect(datagridService.indicatorPage.to).toEqual(10);

    buttonNext.triggerEventHandler('click', null);
    
    tick(500);

    fixture.detectChanges();

    expect(buttonNext.nativeElement.disabled).toBeFalsy();
    expect(buttonPrevious.nativeElement.disabled).toBeFalsy();
    
    expect(datagridService.indicatorPage.from).toEqual(10);
    expect(datagridService.indicatorPage.to).toEqual(20);

    discardPeriodicTasks()
    
    // buttonNext.triggerEventHandler('click', null);

    // fixture.detectChanges();

    // buttonPrevious = fixture.debugElement.query(By.css('.button-previous'));
    // buttonNext = fixture.debugElement.query(By.css('.button-next'));

    // expect(buttonNext.nativeElement.disabled).toBeTruthy();
    // expect(buttonPrevious.nativeElement.disabled).toBeFalsy();

    // expect(datagridService.indicatorPage.from).toEqual(20);
    // expect(datagridService.indicatorPage.to).toEqual(30);
  }))
});
