import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { DatagridService } from '../../../core/service/datagrid/datagrid.service';
import { CocoringDatagridComponent } from './cocoring-datagrid.component';

describe('CocoringDatagridComponent', () => {
  let component: CocoringDatagridComponent;
  let fixture: ComponentFixture<CocoringDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocoringDatagridComponent],
      providers: [
        {
          provide: DatagridService
        },
        FormBuilder
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocoringDatagridComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should test loadDataSource like datagrid.service', () => {
  });
});
