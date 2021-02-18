import { TestBed } from '@angular/core/testing';

import { DatagridDemoService } from './datagrid-demo.service';

describe('DatagridDemoService', () => {
  let service: DatagridDemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatagridDemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
