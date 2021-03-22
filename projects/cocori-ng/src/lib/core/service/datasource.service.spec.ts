import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DatasourceService } from './datasource.service';

describe('DatasourceService', () => {
  let service: DatasourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      schemas: []
    });
    service = TestBed.inject(DatasourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
