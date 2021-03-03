import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { DatagridService } from './datagrid.service';

describe('DatagridService', () => {
  let service: DatagridService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      schemas: []
    });
    service = TestBed.inject(DatagridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
