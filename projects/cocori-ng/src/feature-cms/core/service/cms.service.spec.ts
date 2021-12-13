import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CmsService } from './cms.service';

describe('DatagridService', () => {
  let catalogCmsService: CmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      schemas: []
    });

    catalogCmsService = TestBed.inject(CmsService);
  });

  it('should be created', () => {
    expect(catalogCmsService).toBeTruthy();
  });
});
