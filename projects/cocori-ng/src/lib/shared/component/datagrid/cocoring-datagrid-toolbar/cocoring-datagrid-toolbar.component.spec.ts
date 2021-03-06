import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the total rows of the datagrid', () => {
    expect(component.totalRows).toEqual(0)

    datagridService.lengthDataSource$.next(500)

    expect(component.totalRows).toEqual(500)
  });
});
