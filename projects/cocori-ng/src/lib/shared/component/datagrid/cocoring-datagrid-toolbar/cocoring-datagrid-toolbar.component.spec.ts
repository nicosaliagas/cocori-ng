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

  it('should paginate with success', () => {
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

    datagridService.getAllDatas().subscribe()

    fixture.detectChanges();

    expect(buttonNext.nativeElement.disabled).toBeFalsy();
    expect(buttonPrevious.nativeElement.disabled).toBeFalsy();

    expect(datagridService.currentPage).toEqual(2);
    expect(datagridService.indicatorPage.from).toEqual(10);
    expect(datagridService.indicatorPage.to).toEqual(20);

    buttonNext.triggerEventHandler('click', null);

    datagridService.getAllDatas().subscribe()

    fixture.detectChanges();

    expect(buttonNext.nativeElement.disabled).toBeTruthy();
    expect(buttonPrevious.nativeElement.disabled).toBeFalsy();

    expect(datagridService.currentPage).toEqual(3);
    expect(datagridService.indicatorPage.from).toEqual(20);
    expect(datagridService.indicatorPage.to).toEqual(30);

    buttonPrevious.triggerEventHandler('click', null);

    datagridService.getAllDatas().subscribe()

    fixture.detectChanges();

    expect(buttonNext.nativeElement.disabled).toBeFalsy();
    expect(buttonPrevious.nativeElement.disabled).toBeFalsy();

    expect(datagridService.currentPage).toEqual(2);
    expect(datagridService.indicatorPage.from).toEqual(10);
    expect(datagridService.indicatorPage.to).toEqual(20);
  })

  it('should display the all rows checkbox', () => {
    let config: ConfigDatagridModel = {
      dataSource: { type: DataSourceType.BRUTE, value: { __count: 500, results: [] } },
      withBatchProcessing: true,
      columns: []
    }

    datagridService.config = config

    fixture.detectChanges();

    let element: DebugElement = fixture.debugElement.query(By.css('.select-all'));

    expect(element).toBeTruthy();
  })

  it('should hide the all rows checkbox', () => {
    let config: ConfigDatagridModel = {
      dataSource: { type: DataSourceType.BRUTE, value: { __count: 500, results: [] } },
      withBatchProcessing: false,
      columns: []
    }

    datagridService.config = config

    fixture.detectChanges();

    let element: DebugElement = fixture.debugElement.query(By.css('.select-all'));

    expect(element).toBeFalsy();
  })

  it('should open the modal filter', () => {
    fixture.detectChanges();

    spyOn(component.dialog, 'open')

    // spyOn(component.dialog, 'open')
    // .and
    // .returnValue({ afterClosed: () => of(true) } as MatDialogRef<typeof component>);

    let buttonFilterModal: DebugElement = fixture.debugElement.query(By.css('.button-filter'));

    buttonFilterModal.triggerEventHandler('click', null);

    expect(component.dialog.open).toHaveBeenCalled()
  })
});
